import { TemplateData } from '../../../types/editor'

// Database configuration
const DB_NAME = 'TemplateDatabase'
const DB_VERSION = 1
const TEMPLATE_STORE = 'templates'

/**
 * Initialize the IndexedDB database for templates
 * @returns Promise that resolves when the database is ready
 */
export const initTemplateDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', (event.target as IDBOpenDBRequest).error)
      reject((event.target as IDBOpenDBRequest).error)
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object store for templates if it doesn't exist
      if (!db.objectStoreNames.contains(TEMPLATE_STORE)) {
        const store = db.createObjectStore(TEMPLATE_STORE, { keyPath: 'id' })

        // Create indexes for faster querying
        store.createIndex('name', 'name', { unique: false })
        store.createIndex('lastUpdateAt', 'lastUpdateAt', { unique: false })
        store.createIndex('type', 'type', { unique: false })
      }
    }
  })
}

/**
 * Save a template to IndexedDB
 * @param template The template to save
 * @returns Promise that resolves when the template is saved
 */
export const saveTemplate = async (template: TemplateData): Promise<void> => {
  const db = await initTemplateDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEMPLATE_STORE, 'readwrite')
    const store = transaction.objectStore(TEMPLATE_STORE)
    // Add timestamp if not present
    const templateToSave = {
      ...template,
      lastUpdateAt: template.lastUpdateAt || new Date().toISOString(),
    }

    const request = store.put(templateToSave)

    request.onerror = (event) => {
      console.error('Error saving template:', (event.target as IDBRequest).error)
      reject((event.target as IDBRequest).error)
    }

    request.onsuccess = () => {
      resolve()
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

/**
 * Fetch a template by ID from IndexedDB
 * @param id The ID of the template to fetch
 * @returns Promise that resolves with the template or null if not found
 */
export const fetchTemplateById = async (id: string): Promise<TemplateData | null> => {
  const db = await initTemplateDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEMPLATE_STORE, 'readonly')
    const store = transaction.objectStore(TEMPLATE_STORE)
    const request = store.get(id)

    request.onerror = (event) => {
      console.error('Error fetching template:', (event.target as IDBRequest).error)
      reject((event.target as IDBRequest).error)
    }

    request.onsuccess = () => {
      resolve(request.result || null)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

/**
 * Fetch all templates from IndexedDB
 * @returns Promise that resolves with an array of templates
 */
export const fetchAllTemplates = async (): Promise<TemplateData[]> => {
  const db = await initTemplateDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEMPLATE_STORE, 'readonly')
    const store = transaction.objectStore(TEMPLATE_STORE)
    const request = store.getAll()

    request.onerror = (event) => {
      console.error('Error fetching templates:', (event.target as IDBRequest).error)
      reject((event.target as IDBRequest).error)
    }

    request.onsuccess = () => {
      resolve(request.result || [])
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

/**
 * Delete a template from IndexedDB
 * @param id The ID of the template to delete
 * @returns Promise that resolves when the template is deleted
 */
export const deleteTemplate = async (id: string): Promise<void> => {
  const db = await initTemplateDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TEMPLATE_STORE, 'readwrite')
    const store = transaction.objectStore(TEMPLATE_STORE)
    const request = store.delete(id)

    request.onerror = (event) => {
      console.error('Error deleting template:', (event.target as IDBRequest).error)
      reject((event.target as IDBRequest).error)
    }

    request.onsuccess = () => {
      resolve()
    }

    transaction.oncomplete = () => {
      db.close()
    }
  })
}

/**
 * Search templates by name
 * @param query The search query
 * @returns Promise that resolves with an array of matching templates
 */
export const searchTemplatesByName = async (query: string): Promise<TemplateData[]> => {
  const allTemplates = await fetchAllTemplates()
  const lowerQuery = query.toLowerCase()

  return allTemplates.filter((template) => template.name?.toLowerCase().includes(lowerQuery))
}
