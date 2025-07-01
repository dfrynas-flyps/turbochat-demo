export var VariableHistoryEntryAuthorType;
(function (VariableHistoryEntryAuthorType) {
    VariableHistoryEntryAuthorType["USER"] = "user";
    VariableHistoryEntryAuthorType["SYSTEM"] = "system";
})(VariableHistoryEntryAuthorType || (VariableHistoryEntryAuthorType = {}));
export var LoadState;
(function (LoadState) {
    LoadState["Pending"] = "pending";
    LoadState["Placeholder"] = "placeholder";
    LoadState["Ready"] = "ready";
})(LoadState || (LoadState = {}));
export var TemplateDataTypes;
(function (TemplateDataTypes) {
    TemplateDataTypes["TEMPLATE"] = "template";
    TemplateDataTypes["TEMPLATE_DOCUMENT"] = "templateDocument";
})(TemplateDataTypes || (TemplateDataTypes = {}));
export var TemplateVersionTypes;
(function (TemplateVersionTypes) {
    TemplateVersionTypes["UNKNOWN"] = "unknown";
    TemplateVersionTypes["V5"] = "v5";
    TemplateVersionTypes["V4"] = "v4";
})(TemplateVersionTypes || (TemplateVersionTypes = {}));
export const PROCESSABLE_AI_BE_TEMPLATE_VERSION = TemplateVersionTypes.V5;
export var TEMPLATE_VISIBILITY_TAGS;
(function (TEMPLATE_VISIBILITY_TAGS) {
    TEMPLATE_VISIBILITY_TAGS["DRAFT"] = "draft";
    TEMPLATE_VISIBILITY_TAGS["CATALOG"] = "catalog";
})(TEMPLATE_VISIBILITY_TAGS || (TEMPLATE_VISIBILITY_TAGS = {}));
export const TemplateVisibilityTagsLabels = {
    [TEMPLATE_VISIBILITY_TAGS.DRAFT]: 'Draft',
    [TEMPLATE_VISIBILITY_TAGS.CATALOG]: 'Catalog',
};
export var ActionNames;
(function (ActionNames) {
    ActionNames["ALL_VARIABLES"] = "All variables";
    ActionNames["TYPEOVER"] = "Typeover";
    ActionNames["RECOMMEND_DELETION"] = "Recommend Deletion";
    ActionNames["VARIABLES_OFF"] = "Variables Off";
    ActionNames["OPTIONAL"] = "Optional";
})(ActionNames || (ActionNames = {}));
export var EDocumentType;
(function (EDocumentType) {
    EDocumentType["ScopingLetter"] = "scoping_letter";
    EDocumentType["ProposedAction"] = "proposed_action";
    EDocumentType["DecisionMemo"] = "decision_memo";
    EDocumentType["ResourceEvaluation"] = "resource_evaluation";
    EDocumentType["Other"] = "other";
})(EDocumentType || (EDocumentType = {}));
export var StatementTypes;
(function (StatementTypes) {
    StatementTypes["TABLE"] = "table";
    StatementTypes["IMAGE"] = "image";
    StatementTypes["TEXT"] = "text";
    StatementTypes["LIST"] = "list";
    StatementTypes["ORDERED_LIST"] = "structured_list_item";
    StatementTypes["UNORDERED_LIST"] = "unstructured_list_item";
})(StatementTypes || (StatementTypes = {}));
const ListStatementTypes = [StatementTypes.ORDERED_LIST, StatementTypes.UNORDERED_LIST];
export const isListStatement = (statementOrType) => {
    if (typeof statementOrType === 'string') {
        return ListStatementTypes.includes(statementOrType);
    }
    return ListStatementTypes.includes(statementOrType?.type);
};
// todo mocked from form turboplan
export const TemplatesModuleType = 'templates';
// todo mocked from form turboplan
export const TagsModuleType = 'tags';
//# sourceMappingURL=editor.js.map