import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, Users, X } from 'lucide-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { normalizeImageUrl } from '../utils/imageUtils'
import ImageWithFallback from '../components/ImageWithFallback'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  analysis?: string
  structure?: string
  estimation?: string
  status: 'completed' | 'ongoing' | 'planned'
  featured: boolean
  views: number
  createdAt: string
  updatedAt: string
  sortOrder?: number
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalFlipped, setIsModalFlipped] = useState(false)

  // Fetch projects from Firebase
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const projectsCollection = collection(db, 'projects')
      
      let projectsSnapshot
      try {
        // Try to query projects ordered by sortOrder (ascending)
        const projectsQuery = query(projectsCollection, orderBy('sortOrder', 'asc'))
        projectsSnapshot = await getDocs(projectsQuery)
      } catch (orderByError: any) {
        // If orderBy fails (e.g., missing index), fall back to fetching without orderBy
        console.warn('Failed to query with orderBy, fetching without order:', orderByError)
        try {
          projectsSnapshot = await getDocs(projectsCollection)
        } catch (fallbackError: any) {
          // If even the fallback fails, it's likely a permission issue
          throw fallbackError
        }
      }
      
      const projectsData = projectsSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          technologies: data.technologies || [],
          category: data.category || '',
          analysis: data.analysis || '',
          structure: data.structure || '',
          estimation: data.estimation || '',
          status: data.status || 'planned',
          featured: data.featured || false,
          views: data.views || 0,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          sortOrder: data.sortOrder !== undefined ? data.sortOrder : Number.MAX_SAFE_INTEGER
        }
      }) as Project[]
      
      // Sort projects by sortOrder (in case we fetched without orderBy)
      projectsData.sort((a, b) => {
        const sortA = a.sortOrder ?? Number.MAX_SAFE_INTEGER
        const sortB = b.sortOrder ?? Number.MAX_SAFE_INTEGER
        return sortA - sortB
      })
      
      // Normalize image URLs for all projects in parallel for better performance
      const projectsWithNormalizedImages = await Promise.all(
        projectsData.map(async (project) => {
          // Try to normalize all images, regardless of format
          if (project.image && typeof project.image === 'string') {
            const imageValue = project.image.trim()
            
            // Always try to normalize the image URL first
            try {
              const normalizedUrl = await normalizeImageUrl(imageValue)
              // Use normalized URL if it's valid (starts with http, /, or data:)
              if (normalizedUrl && (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/') || normalizedUrl.startsWith('data:'))) {
                return { ...project, image: normalizedUrl }
              } else {
                // If normalization returned null or invalid URL, set to null
                console.warn(`Invalid image URL for project ${project.id}: ${imageValue}`)
                return { ...project, image: null }
              }
            } catch (error) {
              console.warn(`Failed to normalize image for project ${project.id}:`, error)
              // Set to null if normalization fails
              return { ...project, image: null }
            }
          }
          return { ...project, image: null }
        })
      )
      
      setProjects(projectsWithNormalizedImages)
    } catch (error: any) {
      console.error('Error fetching projects:', error)
      // Provide more helpful error messages
      let errorMessage = 'Failed to load projects. Please try again.'
      if (error?.code === 'permission-denied') {
        errorMessage = 'Permission denied. The Firestore rules may need to be deployed. Please contact the administrator.'
      } else if (error?.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please check your internet connection.'
      } else if (error?.message?.includes('index')) {
        errorMessage = 'Database index is being created. Please wait a few minutes and try again.'
      } else if (error?.code) {
        errorMessage = `Error: ${error.code}. ${error.message || 'Please try again.'}`
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCardClick = (projectId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const handleImageClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation() // Prevent card flip when clicking image
    setSelectedProject(project)
    setIsModalOpen(true)
    setIsModalFlipped(false)
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setIsModalFlipped(false)
    setTimeout(() => setSelectedProject(null), 300)
  }, [])

  const handleModalFlip = () => {
    setIsModalFlipped(!isModalFlipped)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, handleCloseModal])

  return (
    <div className="min-h-screen pt-20">
      {/* Projects Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchProjects}
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Retry'}
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">No projects found.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Check back later for new projects.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => {
                const isFlipped = flippedCards.has(project.id)
                return (
                  <motion.div
                    key={project.id}
                    className="h-[400px] perspective-1000"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`relative w-full h-full preserve-3d transition-transform duration-700 cursor-pointer ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      onClick={() => handleCardClick(project.id)}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front of Card - Image */}
                      <div
                        className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                          <div
                            className="w-full h-full cursor-zoom-in"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleImageClick(e, project)
                            }}
                          >
                            <ImageWithFallback
                              src={project.image}
                              alt={project.title || 'Project image'}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Back of Card - Details */}
                      <div
                        className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4 overflow-y-auto"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="relative h-full">
                          {/* Close button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCardClick(project.id)
                            }}
                            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Close"
                          >
                            <X size={18} className="text-gray-700 dark:text-gray-300" />
                          </button>

                          {/* Details Content */}
                          <div className="space-y-4">
                            {/* Project Analysis */}
                            {project.analysis && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                  <Users size={16} className="text-primary-600" />
                                  Analysis
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                  {project.analysis}
                                </p>
                              </div>
                            )}

                            {/* Estimation */}
                            {project.estimation && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                  <DollarSign size={16} className="text-primary-600" />
                                  Estimation
                                </h4>
                                <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 p-3 rounded-lg">
                                  <p className="text-sm text-primary-800 dark:text-primary-200 font-medium">
                                    {project.estimation}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                  {project.views || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Views</div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                  {project.technologies?.length || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Tech Stack</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal with Flip */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                className="relative w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] perspective-1000"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
                    isModalFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front - Image */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-black rounded-xl shadow-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title || 'Project image'}
                        className="object-contain"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg z-10"
                      aria-label="Close modal"
                    >
                      <X size={24} className="text-gray-900" />
                    </button>
                    <button
                      onClick={handleModalFlip}
                      className="absolute bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-lg z-10 flex items-center gap-2"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Back - Details */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6 overflow-y-auto"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 bg-white/90 dark:bg-gray-700 p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors shadow-lg z-10"
                      aria-label="Close modal"
                    >
                      <X size={24} className="text-gray-900 dark:text-gray-100" />
                    </button>
                    <button
                      onClick={handleModalFlip}
                      className="absolute bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-lg z-10"
                    >
                      Back to Image
                    </button>
                    
                    <div className="space-y-4 pr-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedProject.title}
                        </h3>
                        {selectedProject.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {selectedProject.description}
                          </p>
                        )}
                      </div>

                      {selectedProject.category && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Category:</span>
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded text-xs font-medium">
                            {selectedProject.category}
                          </span>
                        </div>
                      )}

                      {selectedProject.analysis && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Users size={16} className="text-primary-600" />
                            Analysis
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            {selectedProject.analysis}
                          </p>
                        </div>
                      )}

                      {selectedProject.estimation && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <DollarSign size={16} className="text-primary-600" />
                            Estimation
                          </h4>
                          <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 p-3 rounded-lg">
                            <p className="text-sm text-primary-800 dark:text-primary-200 font-medium">
                              {selectedProject.estimation}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {selectedProject.views || 0}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Views</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {selectedProject.technologies?.length || 0}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Tech Stack</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}