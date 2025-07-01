import { useMemo } from 'react';
import { useStatementHistoryManager } from '../components/StatementHistoryManager';
import { countVariablesInText } from '../helpers/variableRegistry';
import { applyDeleteHint, applyOptionalHint, applyVariablesOffHint, setActionAutoApplied } from '../redux/index';
import { StatementTypes } from '../types/editor';
import { ActionNames } from '../types/editor';
import { useAppDispatch } from './redux';
import { useMarkStatementAsTypeover } from './useMarkStatementAsTypeover';
const normalizeHint = (hint) => {
    if (typeof hint === 'string') {
        return hint.replace(/[\])}[{(]/g, '');
    }
    return hint;
};
export const useStatementProposedAction = ({ statement }) => {
    const dispatch = useAppDispatch();
    const markStatementAsTypeover = useMarkStatementAsTypeover();
    const statementHistoryManager = useStatementHistoryManager();
    const hint = useMemo(() => statement.classification?.hint ?? [], [statement.classification?.hint]);
    const actions = useMemo(() => ({
        [ActionNames.ALL_VARIABLES]: {
            key: ActionNames.ALL_VARIABLES,
            priority: 0,
            text: 'Keep as is',
            isVisible: () => false,
            hint: 'Our recommendation is to keep this as is.',
            applyAction: () => {
                dispatch(setActionAutoApplied({
                    id: statement.id,
                    actionAutoApplied: ActionNames.ALL_VARIABLES,
                }));
            },
        },
        [ActionNames.RECOMMEND_DELETION]: {
            key: ActionNames.RECOMMEND_DELETION,
            priority: 1,
            text: 'Delete statement',
            danger: true,
            isVisible: () => true,
            hint: 'Our recommendation is to delete the statement',
            applyAction: () => dispatch(applyDeleteHint({ id: statement.id })),
        },
        [ActionNames.TYPEOVER]: {
            key: ActionNames.TYPEOVER,
            priority: 2,
            divider: true,
            text: 'Typeover',
            isVisible: (statement) => {
                return !statement?.typeoverMode && statement?.type === StatementTypes.TEXT;
            },
            applyAction: () => {
                if (!statement.typeoverMode) {
                    statementHistoryManager.addEntry(statement.id, statement);
                    markStatementAsTypeover(statement);
                    dispatch(setActionAutoApplied({ id: statement.id, actionAutoApplied: ActionNames.TYPEOVER }));
                }
            },
            hint: 'Our recommendation is to rewrite the statement',
        },
        [ActionNames.OPTIONAL]: {
            key: ActionNames.OPTIONAL,
            priority: 3,
            text: 'Optional',
            isVisible: () => true,
            applyAction: () => dispatch(applyOptionalHint({ id: statement.id })),
            hint: 'Our recommendation is to make the statement optional',
        },
        [ActionNames.VARIABLES_OFF]: {
            key: ActionNames.VARIABLES_OFF,
            priority: 4,
            text: 'Turn variables off',
            isVisible: (statement) => {
                const variablesCount = countVariablesInText(statement?.text ?? '');
                return !statement?.turnOffVariables && variablesCount !== 0;
            },
            applyAction: () => {
                const variablesCount = countVariablesInText(statement.text);
                if (variablesCount) {
                    dispatch(applyVariablesOffHint({ id: statement.id }));
                }
            },
            hint: 'Our recommendation is to turn off variables for this sentence',
        },
    }), [dispatch, markStatementAsTypeover, statement, statementHistoryManager]);
    const proposedAction = useMemo(() => {
        const hintedAction = hint.map((el) => actions[normalizeHint(el)]).sort((a, b) => b.priority - a.priority)[0];
        return hintedAction || actions[ActionNames.ALL_VARIABLES];
    }, [actions, hint]);
    return {
        proposedAction,
        actions: Object.values(actions),
    };
};
//# sourceMappingURL=useStatementProposedAction.js.map