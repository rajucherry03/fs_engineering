import React, { useState, useEffect } from 'react'
import { normalizeImageUrl, normalizeImageUrlSync, needsAsyncNormalization } from '../utils/imageUtils'

interface ImageWithFallbackProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackIcon?: string
  fallbackText?: string | null
  debug?: boolean
  [key: string]: any
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackIcon = '📷', 
  fallbackText = null,
  debug = false,
  ...props 
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [normalizedUrl, setNormalizedUrl] = useState<string | null>(null)
  const [isNormalizing, setIsNormalizing] = useState(false)

  // Normalize image URL on mount or when src changes
  useEffect(() => {
    if (!src) {
      setImageError(true)
      setImageLoading(false)
      setNormalizedUrl(null)
      return
    }

    // Try synchronous normalization first (handles full URLs, base64, and local paths)
    const syncUrl = normalizeImageUrlSync(src)
    if (syncUrl) {
      setNormalizedUrl(syncUrl)
      setImageLoading(false)
      setImageError(false)
      return
    }

    // If needs async normalization, fetch proper URL (for Firebase Storage paths)
    if (needsAsyncNormalization(src)) {
      setIsNormalizing(true)
      normalizeImageUrl(src)
        .then(url => {
          if (url) {
            setNormalizedUrl(url)
            setImageError(false)
          } else {
            setImageError(true)
            // If async normalization failed, try as local path fallback
            const localPath = src.startsWith('/') ? src : `/projects/${src.split('/').pop() || src}`
            setNormalizedUrl(localPath)
          }
          setImageLoading(false)
          setIsNormalizing(false)
        })
        .catch(error => {
          console.error('Error fetching image URL:', error)
          // Fallback to local path if async normalization fails
          const localPath = src.startsWith('/') ? src : `/projects/${src.split('/').pop() || src}`
          setNormalizedUrl(localPath)
          setImageError(false) // Try the fallback path
          setImageLoading(false)
          setIsNormalizing(false)
        })
    } else {
      // Invalid format - try as local path
      const localPath = src.startsWith('/') ? src : `/projects/${src.split('/').pop() || src}`
      setNormalizedUrl(localPath)
      setImageError(false)
      setImageLoading(false)
    }
  }, [src])

  const handleError = () => {
    console.warn(`Image failed to load: ${normalizedUrl || src}`)
    setImageError(true)
    setImageLoading(false)
  }

  const handleLoad = () => {
    setImageLoading(false)
  }

  // Show loading state while normalizing or loading
  if (isNormalizing || (imageLoading && normalizedUrl)) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  if (!normalizedUrl || imageError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 ${className}`}>
        {fallbackText ? (
          <span className="text-xs font-medium text-center px-1">
            {fallbackText}
          </span>
        ) : (
          <span className="text-lg">{fallbackIcon}</span>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}
      <img
        src={normalizedUrl}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback
