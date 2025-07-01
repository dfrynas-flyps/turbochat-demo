import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { formatStatementText } from '../helpers/parseTemplateStatements';
import { deleteStatement, setActiveStatement } from '../redux';
import { selectProjectData, selectVariableRegistry } from '../redux/selectors';
import { useSectionContext } from './SectionContext';
import CommonExpandableMenu, { CommonMenu } from './common/ExpandableMenu';
import ClassificationInfo from './regeneration/ClassificationInfo';
export const StatementSideActionsMenu = ({ statement }) => {
    const dispatch = useAppDispatch();
    const projectData = useAppSelector(selectProjectData);
    const variableRegistry = useAppSelector(selectVariableRegistry);
    const { section } = useSectionContext();
    const handleDeleteStatement = () => {
        dispatch(deleteStatement({ id: statement.id }));
        dispatch(setActiveStatement(null));
    };
    return (_jsxs(MenuWrapper, { children: [statement.type !== 'image' && (_jsx(ClassificationInfo, { statement: statement, statementText: formatStatementText({
                    statement,
                    sectionId: section.id,
                    variableRegistry,
                    variableOutput: 'decorated',
                    projectData,
                }) })), _jsx(CommonExpandableMenu, { anchorRight: true, transformRight: true, btnClass: "outlined", iconSize: "tiny", disableRipple: true, renderContent: () => (_jsx(Box, { "data-editor-inner-click-marker": true, children: _jsx(CommonMenu.Item, { danger: true, withBigSpacing: true, onClick: handleDeleteStatement, children: "Delete this statement permanently" }) })) })] }));
};
const MenuWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: '-60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#fff',
    padding: '4px',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.grey[100]}`,
    zIndex: '1',
}));
//# sourceMappingURL=StatementSideActionsMenu.js.map