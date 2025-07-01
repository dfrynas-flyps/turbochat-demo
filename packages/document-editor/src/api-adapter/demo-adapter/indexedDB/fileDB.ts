// Database configuration for file storage
const FILE_DB_NAME = 'FileDatabase'
const FILE_DB_VERSION = 1
const FILE_STORE = 'files'
const BLOB_URL_CACHE = new Map<string, string>()

type FileData = {
  id: string
  name: string
  content: Blob | ArrayBuffer
  contentType: string
  size: number
  uploadedAt: string
  url: string
}

// These methods will be implemented to directly interact with IndexedDB
export async function saveFileToIndexedDB(file: File): Promise<string> {
  const db = await initFileDB()
  const fileId = crypto.randomUUID()

  return new Promise((resolve, reject) => {
    // Read file as ArrayBuffer
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const fileContent = event.target?.result
        if (!fileContent || typeof fileContent === 'string') {
          reject(new Error('Failed to read file content'))
          return
        }

        const transaction = db.transaction(FILE_STORE, 'readwrite')
        const store = transaction.objectStore(FILE_STORE)

        // Construct a unique local URL for the file
        const fileUrl = `local-file://${fileId}`
        const fileData = {
          id: fileId,
          name: file.name,
          content: fileContent,
          contentType: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          url: fileUrl,
        }

        const request = store.put(fileData)

        request.onerror = (event) => {
          console.error('Error saving file:', (event.target as IDBRequest).error)
          reject((event.target as IDBRequest).error)
        }

        request.onsuccess = () => {
          resolve(fileUrl)
        }

        transaction.oncomplete = () => {
          db.close()
        }
      } catch (error) {
        console.error('Error in file reader onload:', error)
        reject(error)
      }
    }

    reader.onerror = (error) => {
      console.error('Error reading file:', error)
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}

export function extractFileIdFromUrl(url: string): string | null {
  if (!url.startsWith('local-file://')) return null
  return url.substring('local-file://'.length)
}

export async function getFileUrlFromIndexedDB(fileId: string): Promise<string> {
  try {
    // Check if we already have a blob URL cached
    if (BLOB_URL_CACHE.has(fileId)) {
      return BLOB_URL_CACHE.get(fileId) || ''
    }

    const fileData = await fetchFileById(fileId)
    if (!fileData) return ''

    // Create blob URL
    const blob = new Blob([fileData.content], { type: fileData.contentType })
    const blobUrl = URL.createObjectURL(blob)

    // Cache the blob URL for future use
    BLOB_URL_CACHE.set(fileId, blobUrl)

    return blobUrl
  } catch (error) {
    console.error('Error getting file URL:', error)
    return ''
  }
}

async function fetchFileById(fileId: string): Promise<FileData | null> {
  const db = await initFileDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(FILE_STORE, 'readonly')
    const store = transaction.objectStore(FILE_STORE)
    const request = store.get(fileId)

    request.onerror = (event) => {
      console.error('Error fetching file:', (event.target as IDBRequest).error)
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

function initFileDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_DB_NAME, FILE_DB_VERSION)

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

      // Create object store for files if it doesn't exist
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        const store = db.createObjectStore(FILE_STORE, { keyPath: 'id' })

        // Create indexes for faster querying
        store.createIndex('name', 'name', { unique: false })
        store.createIndex('uploadedAt', 'uploadedAt', { unique: false })
        store.createIndex('contentType', 'contentType', { unique: false })
      }
    }
  })
}
