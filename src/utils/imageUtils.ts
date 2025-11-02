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

  // 1. If it's already a full HTTP/HTTPS URL, return as-is
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
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

  // If it's already a full HTTP/HTTPS URL or data URL, return as-is
  if (
    imageValue.startsWith('http://') || 
    imageValue.startsWith('https://') ||
    imageValue.startsWith('data:image/')
  ) {
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

