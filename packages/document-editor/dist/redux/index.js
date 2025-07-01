import { createSlice } from '@reduxjs/toolkit';
// import Router from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import { 
// mapActionHintNamesToStatementHintParams,
normalizeTemplateDataRead, } from '../helpers/templateDataCleanup';
import { createOrUpdateVariableRegistry } from '../helpers/variableRegistry';
import { StatementTypes, TemplateDataTypes, } from '../types/editor';
import { ActionNames } from '../types/editor';
import { createNewStatement, updatePromptFields, updateSectionField, updateStatementField } from './helpers';
import { 
// fetchAITemplate,
fetchData, fetchVariableAIOptions, getPrompts, 
// getTitle,
getVariableLatestValues, 
// reclassifyDynamicActionHints,
// reclassifyTemplate,
// regenerateSection,
// regenerateTemplate,
saveData, setPrompts, setVariableLatestValues, } from './thunks';
const initialState = {
    activeVar: null,
    activeSection: null,
    variableAIOptions: {},
    projectVariableValues: [],
    activeStatement: null,
    isTemplateLoading: false,
    data: null,
    poolingPrompts: null,
    initialData: null,
    createState: {
        loading: false,
        error: false,
    },
    savingState: {
        initialSaveSuccess: false,
        state: 'none',
        error: false,
    },
    newStatement: null,
    alert: {
        text: '',
    },
    projectData: {},
    triggerDataSave: null,
    trackLoadedTemplateAfterCreation: false,
    prompts: {
        templatize: [],
        classify: [],
        actionHintLogic: [],
        classifyImage: [
            {
                id: 'classify_image_id_v5_dev',
                name: 'classify_image_id_v5_dev',
                initial: true,
                default: true,
                prompt: "Introduction:\\n    Imagine you are working with a set of images from the '{{doc_type}}' document. Your objective is to classify each image based on its relevance to the document and its potential utility in a template.\\n\\nSpecial Considerations:\\n    - Use the following classifications to categorize each image:\\n        - Map — this image is a map\\n        - Signature — this image is a signature\\n        - Chart — this image is a chart\\n        - Natural — this image is a photo of the natural environment\\n        - Project landscape — this image is a photo of the project landscape\\n        - General — this image is a general photo, about an overall landscape or its history or government program\\n        - Occurrence — this image is about a prior event that happened or a report that was generated\\n        - Scientific reference — this image represents a scientific article\\n        - Artefact — this image is a scan of text that didn't properly convert to text\\n        - Logo — this image is a logo\\n    - Images should be horizontally oriented.\\n\\nInstructions:\\n    1. For each image, classify it based on its content and relevance to the document.\\n    2. Choose the most appropriate classification from the list provided above.\\n    3. If image is not horizontally oriented, return degree of rotation needed to make it horizontal.",
            },
        ],
    },
};
export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        updateTemplate: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setActiveVar: (state, action) => {
            state.activeVar = action.payload;
        },
        setActiveStatement: (state, action) => {
            if (action.payload) {
                state.activeStatement = {
                    id: action.payload.id,
                    navInitiated: action.payload.navInitiated || false,
                    classificationOpen: action.payload.classificationOpen || false,
                };
            }
            else {
                state.activeStatement = null;
            }
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setDocumentHeading: (state, action) => {
            if (state.data) {
                state.data.documentHeading = action.payload;
            }
            else {
                state.data = {
                    documentHeading: action.payload,
                    id: '',
                    state: 'pending',
                    sections: [],
                    promptIds: {},
                    type: TemplateDataTypes.TEMPLATE,
                };
            }
            state.triggerDataSave = Date.now();
        },
        clearPoolingPrompts: (state) => {
            state.poolingPrompts = null;
        },
        setData: (state, action) => {
            state.data = normalizeTemplateDataRead(action.payload);
        },
        setFetchError: (state, action) => {
            state.createState = {
                error: action.payload,
                loading: false,
            };
        },
        addNewVariable: (state, action) => {
            const newVariable = action.payload;
            if (!state.data?.variableRegistry) {
                throw new Error('Unable to add variable before establishing variable registry');
            }
            state.data.variableRegistry[newVariable.name] = newVariable;
        },
        updateVariable: (state, action) => {
            const { variableName, newValue } = action.payload;
            if (!state.data?.variableRegistry) {
                throw new Error('Unable to update variable before establishing variable registry');
            }
            state.data.variableRegistry[variableName].value = newValue;
            const variablePattern = `{${variableName}}`;
            const isOnlySectionActive = state.activeSection?.id && !state.activeStatement?.id;
            const isOnlyStatementActive = !!state.activeStatement?.id;
            state.data.sections = state.data.sections.map((section) => {
                const shouldBeSectionEditorUpdated = (!isOnlySectionActive || section.id !== state.activeSection?.id) && section.name.includes(variablePattern);
                const updatedStatements = section.statements.map((statement) => {
                    const shouldBeStatementEditorUpdated = (!isOnlyStatementActive || statement.id !== state.activeStatement?.id) &&
                        statement.text.includes(variablePattern);
                    return {
                        ...statement,
                        _triggerUpdate: shouldBeStatementEditorUpdated,
                    };
                });
                return {
                    ...section,
                    statements: updatedStatements,
                    _triggerUpdate: shouldBeSectionEditorUpdated,
                };
            });
            state.triggerDataSave = Date.now();
        },
        clearVariableAIOptions: (state, action) => {
            const { variableName } = action.payload;
            if (state?.variableAIOptions?.[variableName]) {
                state.variableAIOptions[variableName] = null;
            }
        },
        applyVariableAIOptions: (state, action) => {
            const { variableName, variableOptions, loadingState } = action.payload;
            if (variableOptions) {
                state.variableAIOptions[variableName] = {
                    loadingState,
                    variableOptions,
                };
            }
        },
        setVariableHistory: (state, action) => {
            const { variableName, newHistory } = action.payload;
            if (!state.data?.variableRegistry) {
                throw new Error('Unable to update variable history before establishing variable registry');
            }
            state.data.variableRegistry[variableName].variableHistory = newHistory;
            state.triggerDataSave = Date.now();
        },
        updateStatement: (state, action) => {
            if (!state.data) {
                throw new Error('Unable to update statement before establishing template data');
            }
            const { id, updatePayload, shouldSave = true } = action.payload;
            state.data.sections = state.data.sections.map((section) => ({
                ...section,
                statements: section.statements.map((statement) => {
                    if (statement.id !== id) {
                        return statement;
                    }
                    const updatedStatement = {
                        ...statement,
                        ...(statement.type === StatementTypes.IMAGE && { isImageReady: true }),
                        ...updatePayload,
                    };
                    return updatedStatement;
                }),
            }));
            if (shouldSave) {
                state.triggerDataSave = Date.now();
            }
        },
        toggleLastStatement: (state, action) => {
            const { payload: { id, lastStatement }, } = action;
            updateStatementField({
                state,
                id,
                newValues: {
                    last_statement: !lastStatement,
                },
            });
        },
        typeoverStatement: (state, action) => {
            const { payload: { text, id, newVariables, typeoverMode }, } = action;
            updateStatementField({
                state,
                id: id,
                newValues: {
                    text,
                    _triggerUpdate: true,
                    typeoverMode,
                    ...(newVariables && { variables: newVariables }),
                },
            });
            state.triggerDataSave = Date.now();
        },
        setActionAutoApplied: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.id,
                newValues: { actionAutoApplied: action.payload.actionAutoApplied },
            });
            state.triggerDataSave = Date.now();
        },
        addNewStatement: (state, action) => {
            if (!state.data) {
                console.warn('Unable to add new statement - template data is missing');
                return;
            }
            const newStatementData = action.payload;
            const activeStatementId = state.activeStatement?.id;
            const activeSectionId = state.activeSection?.id;
            const activeSection = state.data.sections.find((section) => section.id === activeSectionId);
            if (!activeSectionId) {
                throw new Error('Unable to insert new statement - active section id is missing');
            }
            if (!activeStatementId && activeSectionId && newStatementData) {
                activeSection?.statements.splice(0, 0, createNewStatement(newStatementData));
                state.activeStatement = {
                    id: newStatementData.id,
                    navInitiated: false,
                    classificationOpen: false,
                };
            }
            if (activeStatementId && newStatementData) {
                state.data.sections = state.data.sections.map((section) => {
                    const activeStatementIndex = section.statements.findIndex((statement) => statement.id === activeStatementId);
                    if (activeStatementIndex === -1) {
                        return section;
                    }
                    const updatedStatements = section.statements;
                    if (newStatementData.mode === 'prepend') {
                        updatedStatements.splice(activeStatementIndex, 0, createNewStatement(newStatementData));
                    }
                    else {
                        updatedStatements.splice(activeStatementIndex + 1, 0, createNewStatement(newStatementData));
                        state.activeStatement = {
                            id: newStatementData.id,
                            navInitiated: false,
                            classificationOpen: false,
                        };
                    }
                    return {
                        ...section,
                        statements: updatedStatements,
                    };
                });
            }
            state.newStatement = newStatementData;
        },
        addNewSection: (state, action) => {
            if (!state.data) {
                console.warn('Unable to add new section - template data is missing');
                return;
            }
            const newSectionId = uuidv4();
            const newStatementId = uuidv4();
            const { name } = action.payload;
            state.data.sections = [
                ...state.data.sections,
                {
                    name,
                    id: newSectionId,
                    state: 'success',
                    statements: [createNewStatement({ type: StatementTypes.TEXT, id: newStatementId })],
                    path_variable_mapping: {},
                    header_size: 'h3',
                    variables: [],
                },
            ];
            state.newStatement = { id: newStatementId, type: StatementTypes.TEXT };
            state.activeStatement = {
                id: newStatementId,
                navInitiated: false,
                classificationOpen: false,
            };
            state.triggerDataSave = Date.now();
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setTrackLoadedTemplateAfterCreation: (state, action) => {
            state.trackLoadedTemplateAfterCreation = action.payload;
        },
        setProjectData: (state, action) => {
            state.projectData = action.payload;
        },
        setNewStatement: (state, action) => {
            state.newStatement = action.payload;
        },
        setImageAsConfirmed: (state, action) => {
            updateStatementField({ state, id: action.payload.id, newValues: { isImageReady: true } });
            state.triggerDataSave = Date.now();
        },
        setRegeneratedSection: (state, action) => {
            if (action.payload?.id && state.data) {
                const updatedTemplate = {
                    ...state.data,
                    sections: state.data.sections.map((section) => ({
                        ...section,
                        ...(section.id === action.payload?.id && { ...action.payload, isRegenerating: false }),
                    })),
                };
                state.data = createOrUpdateVariableRegistry(updatedTemplate);
                state.triggerDataSave = Date.now();
            }
        },
        deleteStatement: (state, action) => {
            if (!state.data) {
                throw new Error('Unable to remove statement before establishing template data');
            }
            state.data.sections = state.data.sections.map((section) => ({
                ...section,
                statements: section.statements.flatMap((statement) => {
                    if (statement.id !== action.payload.id) {
                        return [statement];
                    }
                    return [];
                }),
            }));
            state.triggerDataSave = Date.now();
        },
        applyDeleteHint: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.id,
                newValues: { isDeleted: true, actionAutoApplied: ActionNames.RECOMMEND_DELETION },
            });
            state.triggerDataSave = Date.now();
        },
        toggleSectionSoftDelete: (state, action) => {
            if (!state.data) {
                console.warn('Unable to toggle section soft delete before establishing template data');
                return;
            }
            state.data.sections.forEach((section) => {
                if (section.id === action.payload.id) {
                    section.statements.forEach((statement) => {
                        updateStatementField({
                            state,
                            id: statement.id,
                            newValues: { isDeleted: action.payload.isDeleted },
                        });
                    });
                }
            });
            state.triggerDataSave = Date.now();
        },
        deleteSection: (state, action) => {
            if (!state.data) {
                console.warn('Unable to remove section before establishing template data');
                return;
            }
            state.data.sections = state.data.sections.flatMap((section) => {
                if (section.id !== action.payload.id) {
                    return [section];
                }
                return [];
            });
            state.triggerDataSave = Date.now();
        },
        renameSection: (state, action) => {
            const { id, newName } = action.payload;
            updateSectionField({ state, id, newValues: { name: newName } });
            state.triggerDataSave = Date.now();
        },
        changeSectionHeadingSize: (state, action) => {
            const { id, newName } = action.payload;
            updateSectionField({ state, id, newValues: { header_size: newName } });
            state.triggerDataSave = Date.now();
        },
        setCreateState: (state, action) => {
            state.createState = action.payload;
        },
        applyVariablesOffHint: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.id,
                newValues: {
                    turnOffVariables: true,
                    _triggerUpdate: true,
                    actionAutoApplied: ActionNames.VARIABLES_OFF,
                },
            });
            state.triggerDataSave = Date.now();
        },
        toggleStatementVariables: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.statementId,
                newValues: { turnOffVariables: action.payload.turnOff, _triggerUpdate: true },
            });
            state.triggerDataSave = Date.now();
        },
        applyOptionalHint: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.id,
                newValues: {
                    optionalStatement: true,
                    _triggerUpdate: true,
                    actionAutoApplied: ActionNames.OPTIONAL,
                },
            });
            state.triggerDataSave = Date.now();
        },
        toggleStatementOptional: (state, action) => {
            updateStatementField({
                state,
                id: action.payload.statementId,
                newValues: { optionalStatement: action.payload.optional, _triggerUpdate: true },
            });
            state.triggerDataSave = Date.now();
        },
        toggleDeleteModal: (state, action) => {
            state.deleteModal = action.payload;
        },
        setPromptToDelete: (state, action) => {
            state.promptToDelete = action.payload.id;
        },
        setPromptId: (state, action) => {
            const { type, id } = action?.payload || { type: '', id: '' };
            if (!state.data) {
                console.warn('Unable to set prompt id before establishing template data');
                return;
            }
            if (!type || !id) {
                console.warn('Unable to set prompt id - missing type or id');
                return;
            }
            state.data.promptIds = { ...state.data.promptIds, [type]: id };
        },
        updateAndSaveSection: (state, action) => {
            const { id, newValues } = action.payload;
            updateSectionField({ state, id, newValues: newValues });
            state.triggerDataSave = Date.now();
        },
        resetState: () => initialState,
        updateDocumentHeader: (state, action) => {
            if (state.data === null)
                return;
            state.data.documentHeader = action.payload;
            state.triggerDataSave = Date.now();
        },
        setIndentLevel: (state, action) => {
            if (!state.data) {
                throw new Error('Unable to change indentation before establishing template data');
            }
            state.data.sections = state.data.sections.map((section) => {
                const isRelevantSection = section.statements.some((statement) => statement.id === action.payload.statementId);
                if (!isRelevantSection) {
                    return section;
                }
                return {
                    ...section,
                    statements: section.statements.map((statement) => {
                        if (statement.id === action.payload.statementId) {
                            return {
                                ...statement,
                                indent_level: action.payload.indentLevel,
                            };
                        }
                        return statement;
                    }),
                };
            });
            state.triggerDataSave = Date.now();
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchAITemplate.fulfilled, (state, action) => {
        //   state.initialData = normalizeTemplateDataRead(action.payload.data)
        //   state.poolingPrompts = {
        //     prompt: action.payload.prompt,
        //   }
        // })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.savingState.initialSaveSuccess = true;
            state.data = normalizeTemplateDataRead(action.payload);
            if (!action.payload.id) {
                state.savingState = {
                    initialSaveSuccess: false,
                    error: true,
                    state: 'error',
                };
            }
        });
        builder.addCase(fetchData.rejected, (state, { payload }) => {
            if (payload?.status === 404)
                state.alert = { text: 'This template no longer exists', type: 'error' };
            else
                state.alert = { text: 'Could not fetch template', type: 'error' };
        });
        builder.addCase(setVariableLatestValues.fulfilled, (state, { payload }) => {
            state.projectVariableValues = payload.projectVariables;
        });
        builder.addCase(getVariableLatestValues.fulfilled, (state, { payload }) => {
            state.projectVariableValues = payload.projectVariables;
        });
        builder.addCase(saveData.pending, (state) => {
            state.savingState.state = 'loading';
        });
        builder.addCase(saveData.fulfilled, (state, action) => {
            const { meta: { arg: { createDocument,
            // id
             }, }, payload, } = action;
            if (createDocument) {
                // TODO: possibly redundant, but temporarily I leave console.error here to make sure
                console.error('createDocument redirect not implemented!');
                // Router.push({
                //   pathname: `/org/${Router.query.org}/project/${Router.query.projectPath}/templatize/${id}`,
                //   query: Router.query,
                // })
                // state.data = null
                // state.initialData = null
            }
            else {
                if (!state.data?.sections?.length) {
                    state.data = payload;
                }
                state.triggerDataSave = null;
            }
            state.isTemplateLoading = false;
            state.savingState = {
                initialSaveSuccess: true,
                state: 'saved',
                error: false,
            };
        });
        builder.addCase(saveData.rejected, (state) => {
            state.savingState.state = 'error';
            state.savingState.error = true;
            state.isTemplateLoading = false;
        });
        builder.addCase(fetchVariableAIOptions.rejected, (state, action) => {
            const { variableName } = action.payload || { variableName: '' };
            if (!variableName) {
                console.warn('Unable to set variable AI options - missing variable name');
                return;
            }
            state.alert = { text: 'AI service is busy, try again in a moment', type: 'error' };
            state.variableAIOptions[variableName] = {
                loadingState: 'error',
                variableOptions: null,
            };
        });
        // builder.addCase(regenerateSection.pending, (state, { meta }) => {
        //   updateSectionField({ state, id: meta.arg?.sectionId, newValues: { isRegenerating: true } })
        // })
        // builder.addCase(regenerateSection.rejected, (state, { meta }) => {
        //   state.alert = { text: 'Failed to regenerate', type: 'error' }
        //   updateSectionField({ state, id: meta.arg?.sectionId, newValues: { isRegenerating: false } })
        // })
        // builder.addCase(regenerateTemplate.pending, (state) => {
        //   state.createState.loading = true
        // })
        // builder.addCase(regenerateTemplate.rejected, (state) => {
        //   state.createState.loading = false
        //   state.poolingPrompts = null
        //   state.alert = { text: 'Failed to regenerate', type: 'error' }
        // })
        // builder.addCase(regenerateTemplate.fulfilled, (state, action) => {
        //   state.createState.loading = false
        //   state.initialData = action.payload.data
        //   state.poolingPrompts = {
        //     prompt: action.payload.prompt,
        //   }
        //   if (!state.data) {
        //     console.warn('Unable to regenerate template before establishing template data')
        //     return
        //   }
        //   state.data = {
        //     ...state.data,
        //     variableRegistry: undefined,
        //     state: 'pending',
        //     sections: [],
        //   }
        // })
        // builder.addCase(reclassifyTemplate.pending, (state) => {
        //   state.alert = { text: 'Classifying statements', type: 'info' }
        //   updateStatementField({ state, newValues: { classification: { state: 'loading' } }, id: '', updateAll: true })
        // })
        // builder.addCase(reclassifyTemplate.rejected, (state) => {
        //   updateStatementField({ state, newValues: { classification: null }, id: '', updateAll: true })
        //   state.alert = { text: 'Failed to reclassify statements', type: 'error' }
        // })
        // builder.addCase(reclassifyTemplate.fulfilled, (state) => {
        //   if (!state.data) {
        //     console.warn('Unable to reclassify statements before establishing template data')
        //     return
        //   }
        //
        //   console.error('reclassifyTemplate side effect not implemented!')
        //   // TODO: types seem to be totally broken here, it needs to be reviewed in case we want the "reclassify" feature
        //   // if (action.payload?.length) {
        //   //   state.data.sections = state.data.sections.map((section) => {
        //   //     const reclassifiedSection = action.payload.find((el: TemplateSection) => el.id === section.id)
        //   //     return {
        //   //       ...section,
        //   //       classification: reclassifiedSection?.header || null,
        //   //       statements: section.statements.map((statement) => ({
        //   //         ...statement,
        //   //         classification:
        //   //           reclassifiedSection?.statements.find((el: TemplateStatement) => el.id === statement.id) || null,
        //   //       })),
        //   //     }
        //   //   })
        //   //   state.data.classify_prompt_id = action.payload[0].prompt_id
        //   //
        //   //   state.alert = { text: 'Statements successfully classified.', type: 'success' }
        //   //   state.triggerDataSave = Date.now()
        //   // } else {
        //   //   state.alert = { text: 'Failed to reclassify statements', type: 'error' }
        //   // }
        // })
        // builder.addCase(getTitle.pending, (state, { meta }) => {
        //   updateStatementField({ state, id: meta.arg?.statementId, newValues: { nameStatus: LoadState.Pending } })
        // })
        // builder.addCase(getTitle.rejected, (state, { meta }) => {
        //   updateStatementField({
        //     state,
        //     id: meta.arg?.statementId,
        //     newValues: {
        //       nameStatus: LoadState.Placeholder,
        //       name: meta.arg?.text,
        //     },
        //   })
        // })
        // builder.addCase(getTitle.fulfilled, (state, action) => {
        //   const { meta, payload } = action
        //   updateStatementField({
        //     state,
        //     id: meta.arg?.statementId,
        //     newValues: { name: payload, nameStatus: LoadState.Ready },
        //   })
        //   state.triggerDataSave = Date.now()
        // })
        // builder.addCase(reclassifyDynamicActionHints.pending, (state) => {
        //   state.alert = { text: 'Apply dynamic action hints', type: 'info' }
        // })
        // builder.addCase(reclassifyDynamicActionHints.rejected, (state) => {
        //   state.alert = { text: 'Failed to apply dynamic action hints', type: 'error' }
        // })
        // builder.addCase(reclassifyDynamicActionHints.fulfilled, (state) => {
        //   if (!state.data) {
        //     console.warn('Unable to reclassify dynamic action hints before establishing template data')
        //     return
        //   }
        //
        //   console.error('reclassifyDynamicActionHints side effect not implemented!')
        //   // TODO: types seem to be totally broken here, it needs to be reviewed in case we want the "reclassify" feature
        //   // if (action.payload?.length) {
        //   //   const sectionToSave = state.data.sections.map((section) => {
        //   //     const reclassifyDynamicActionHintsSection = action.payload.find((el) => el.id === section.id)
        //   //
        //   //     return {
        //   //       ...section,
        //   //       classification: reclassifyDynamicActionHintsSection?.header
        //   //         ? {
        //   //             ...reclassifyDynamicActionHintsSection?.header,
        //   //             id: reclassifyDynamicActionHintsSection.id,
        //   //           }
        //   //         : null,
        //   //       statements: section.statements.map((statement) => {
        //   //         const reclassifyDynamicActionHintsStatement = reclassifyDynamicActionHintsSection?.statements.find(
        //   //           (el) => el.id === statement.id
        //   //         )
        //   //         const hint = reclassifyDynamicActionHintsStatement?.hint
        //   //
        //   //         return {
        //   //           ...statement,
        //   //           actionAutoApplied: Array.isArray(hint) && hint.length > 0 ? hint[0] : null,
        //   //           classification: reclassifyDynamicActionHintsStatement || null,
        //   //           ...mapActionHintNamesToStatementHintParams(hint || []),
        //   //         }
        //   //       }),
        //   //     }
        //   //   })
        //   //   state.data.sections = sectionToSave
        //   //
        //   //   state.alert = { text: 'Statements successfully apply dynamic action hints.', type: 'success' }
        //   //   state.triggerDataSave = Date.now()
        //   // } else {
        //   //   state.alert = { text: 'Failed to apply dynamic action hints', type: 'error' }
        //   // }
        // })
        builder.addCase(getPrompts.fulfilled, (state, action) => {
            updatePromptFields({ state, prompts: action.payload.prompts });
        });
        builder.addCase(setPrompts.fulfilled, (state, action) => {
            updatePromptFields({ state, prompts: action.payload.prompts });
        });
    },
});
export const { updateTemplate, setActiveVar, setActiveSection, setActiveStatement, setDocumentHeading, clearPoolingPrompts, setFetchError, setAlert, setTrackLoadedTemplateAfterCreation, setData, setNewStatement, addNewStatement, addNewSection, setProjectData, updateStatement, updateVariable, applyVariableAIOptions, clearVariableAIOptions, setVariableHistory, addNewVariable, deleteStatement, deleteSection, renameSection, setImageAsConfirmed, setRegeneratedSection, resetState, setCreateState, applyVariablesOffHint, toggleStatementVariables, applyOptionalHint, toggleStatementOptional, toggleDeleteModal, toggleLastStatement, typeoverStatement, setActionAutoApplied, applyDeleteHint, toggleSectionSoftDelete, setPromptToDelete, setPromptId, updateAndSaveSection, changeSectionHeadingSize, updateDocumentHeader, setIndentLevel, } = templateSlice.actions;
export * from './thunks';
export default templateSlice.reducer;
//# sourceMappingURL=index.js.map