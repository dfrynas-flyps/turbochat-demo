export const checkSectionSoftDeleted = (section) => {
    if (section?.statements.length === 0)
        return false;
    return section.statements.every((statement) => statement.isDeleted);
};
export const isLoading = (state) => ['processing', 'pending', 'retry'].includes(state);
//# sourceMappingURL=index.js.map