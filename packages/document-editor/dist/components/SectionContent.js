import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { isLoading } from '../helpers';
import GenerationError from './GenerationError';
import Skeleton from './Skeleton';
import Statement from './Statement';
import { StatementContextProvider } from './StatementContext';
const SectionContent = ({ section }) => {
    let deletedStatements = 0;
    if (isLoading(section.state) || section.isRegenerating) {
        return _jsx(Skeleton, { itemsCount: 3 });
    }
    if (section.state === 'failed') {
        return _jsx(GenerationError, { failedSections: [section] });
    }
    return (_jsx(_Fragment, { children: section.statements.map((statement, idx) => {
            if (statement.isDeleted)
                deletedStatements++;
            return (_jsx(StatementContextProvider, { statement: statement, statementIndex: idx - deletedStatements, children: _jsx(Statement, {}) }, statement.id));
        }) }));
};
export default SectionContent;
//# sourceMappingURL=SectionContent.js.map