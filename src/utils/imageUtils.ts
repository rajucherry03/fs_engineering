import { storage } from '../lib/firebase'
import { ref, getDownloadURL } from 'firebase/storage'

/**
 * Normalize image URL to ensure it's a valid, accessible URL
 * Handles multiple formats:
 * - Full URLs (https://...)
 * - Firebase Storage paths (projects/images/...)
 * - Firebase Storage references (gs://...)
 * - Local paths (/projects/pic1.jpg)
 * 
 * @param {string} imageValue - Image value from Firestore
 * @returns {Promise<string|null>} - Normalized URL or null if invalid
 */
export async function normalizeImageUrl(imageValue: string | null | undefined): Promise<string | null> {
  if (!imageValue || typeof imageValue !== 'string') {
    return null
  }

  // Trim whitespace
  imageValue = imageValue.trim()

  // 1. If it's already a full HTTP/HTTPS URL, check for Google Drive and convert if needed
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
    // Handle Google Drive URLs - convert to direct image URL
    const googleDriveUrl = convertGoogleDriveUrl(imageValue)
    if (googleDriveUrl) {
      return googleDriveUrl
    }
    return imageValue
  }

  // 2. If it's a base64 data URL, return as-is (CHECK EARLY to avoid Firebase Storage processing)
  if (imageValue.startsWith('data:image/')) {
    return imageValue
  }

  // 3. If it's a local path (starts with /), it's valid for web
  if (imageValue.startsWith('/')) {
    return imageValue
  }

  // 4. If it looks like a local file (projects folder or pic*.jpg pattern), convert to local path
  if (imageValue.includes('projects/') || imageValue.match(/^pic\d+\.jpg$/i)) {
    const filename = imageValue.replace(/^.*\//, '') || imageValue
    return `/projects/${filename}`
  }

  // 5. If it's a Firebase Storage gs:// URL, convert to HTTPS
  if (imageValue.startsWith('gs://')) {
    try {
      const path = imageValue.replace('gs://', '').split('/').slice(1).join('/')
      const storageRef = ref(storage, path)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Failed to get Firebase Storage URL for gs:// path:', imageValue, error)
      return null
    }
  }

  // 6. If it looks like a Firebase Storage path (contains / but doesn't start with / and isn't base64)
  // Only try Firebase Storage if it looks like a valid path (not a filename without extension, not base64)
  const looksLikeStoragePath = imageValue.includes('/') && 
                                !imageValue.startsWith('/') && 
                                !imageValue.startsWith('data:') &&
                                !imageValue.match(/^[a-zA-Z0-9_-]+\.[a-z]{3,4}$/i) // Not a simple filename like "image.jpg"
  
  if (looksLikeStoragePath) {
    try {
      const storageRef = ref(storage, imageValue)
      const url = await getDownloadURL(storageRef)
      return url
    } catch (error) {
      // If Firebase Storage fails, try as local path fallback
      console.warn('Failed to get Firebase Storage URL for path, trying as local:', imageValue, error)
      const filename = imageValue.split('/').pop() || imageValue
      return `/projects/${filename}`
    }
  }

  // 7. For simple filenames, try as local path first
  if (imageValue.match(/^[a-zA-Z0-9_-]+\.[a-z]{3,4}$/i)) {
    return `/projects/${imageValue}`
  }

  // 8. Last resort: try as Firebase Storage path (but catch errors properly)
  try {
    const storageRef = ref(storage, imageValue)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    // If Firebase Storage fails, try as local path fallback
    console.warn('Failed to resolve image URL, trying as local path:', imageValue, error)
    return `/projects/${imageValue}`
  }
}

/**
 * Normalize image URL synchronously (for immediate use, may return path)
 * Use this for initial render, then fetch proper URL if needed
 * 
 * @param {string} imageValue - Image value from Firestore
 * @returns {string|null} - URL or path
 */
export function normalizeImageUrlSync(imageValue: string | null | undefined): string | null {
  if (!imageValue || typeof imageValue !== 'string') {
    return null
  }

  // Trim whitespace
  imageValue = imageValue.trim()

  // If it's already a full HTTP/HTTPS URL or data URL, check for Google Drive
  if (
    imageValue.startsWith('http://') || 
    imageValue.startsWith('https://') ||
    imageValue.startsWith('data:image/')
  ) {
    // Handle Google Drive URLs synchronously
    if (imageValue.includes('drive.google.com')) {
      const googleDriveUrl = convertGoogleDriveUrlSync(imageValue)
      if (googleDriveUrl) {
        return googleDriveUrl
      }
    }
    return imageValue
  }

  // If it's a local path (starts with /), return it
  if (imageValue.startsWith('/')) {
    return imageValue
  }

  // If it looks like a local file (projects folder or pic*.jpg pattern)
  if (imageValue.includes('projects/') || imageValue.match(/^pic\d+\.jpg$/i)) {
    const filename = imageValue.replace(/^.*\//, '') || imageValue
    return `/projects/${filename}`
  }

  // For other formats, return null to trigger async normalization
  return null
}

/**
 * Convert Google Drive URL to direct image URL with fallback formats
 * Handles multiple Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID (already direct)
 * 
 * @param {string} url - Google Drive URL
 * @returns {string|null} - Direct image URL or null if not a Google Drive URL
 */
function convertGoogleDriveUrl(url: string): string | null {
  if (!url || !url.includes('drive.google.com')) {
    return null
  }

  // Extract file ID from various Google Drive URL formats
  let fileId: string | null = null

  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    fileId = fileMatch[1]
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (openMatch) {
      fileId = openMatch[1]
    }
  }

  // Format 3: https://drive.google.com/uc?id=FILE_ID (already direct, but ensure it's the image format)
  if (url.includes('/uc?id=')) {
    const ucMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (ucMatch) {
      fileId = ucMatch[1]
      // Return as direct thumbnail URL for better image display
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
  }

  if (!fileId) {
    return null
  }

  // Return direct thumbnail URL (sz=w1000 for high quality, can be adjusted)
  // Try multiple formats for better compatibility
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
}

/**
 * Convert Google Drive URL synchronously (for immediate use)
 * @param {string} url - Google Drive URL
 * @returns {string|null} - Direct image URL or null
 */
function convertGoogleDriveUrlSync(url: string): string | null {
  return convertGoogleDriveUrl(url)
}

/**
 * Check if image value needs async normalization
 * @param {string} imageValue - Image value from Firestore
 * @returns {boolean}
 */
export function needsAsyncNormalization(imageValue: string | null | undefined): boolean {
  if (!imageValue || typeof imageValue !== 'string') {
    return false
  }
  
  return !(
    imageValue.startsWith('http://') ||
    imageValue.startsWith('https://') ||
    imageValue.startsWith('data:image/') ||
    imageValue.startsWith('/')
  )
}

