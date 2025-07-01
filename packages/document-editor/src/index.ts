// API Adapter exports
import { ApiAdapter, InMemoryApiAdapter, getApiAdapter, setApiAdapter } from './api-adapter/index'

import * as ApiAdapterTypes from './api-adapter/types'
import { EditorContainer } from './components/EditorContainer'
import { isDataReady } from './redux/templateListener'
// Types
import * as EditorTypes from './types/editor'

// Export components
export {
  // Main components
  EditorContainer,
  // API Adapter
  ApiAdapter,
  InMemoryApiAdapter,
  getApiAdapter,
  setApiAdapter,
  isDataReady,
  // Types
  EditorTypes,
  ApiAdapterTypes,
}

/**
 * Document Editor
 *
 * A customizable document editing library that allows for rich text editing,
 * templating, and API customization through adapters.
 *
 * @example
 * ```tsx
 * import {
 *   EditorComponent,
 *   setApiAdapter,
 *   DefaultApiAdapter
 * } from '@wildfires-org/document-editor';
 *
 * // Customize API behavior (optional)
 * class CustomApiAdapter extends DefaultApiAdapter {
 *   fetchTemplate = async (params) => {
 *     // Custom implementation
 *     console.log('Custom fetchTemplate implementation');
 *     return await super.fetchTemplate(params);
 *   }
 * }
 *
 * // Set the custom adapter
 * setApiAdapter(new CustomApiAdapter());
 *
 * // Use the editor component
 * const MyEditor = () => {
 *   return <EditorComponent sections={mySections} />;
 * };
 * ```
 */
