import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, DollarSign, Users, Star, X } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
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
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const projectsCollection = collection(db, 'projects')
        const projectsSnapshot = await getDocs(projectsCollection)
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
            updatedAt: data.updatedAt || new Date().toISOString()
          }
        }) as Project[]
        
        // Sort by createdAt (newest first)
        projectsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        // Normalize image URLs for all projects in parallel for better performance
        const projectsWithNormalizedImages = await Promise.all(
          projectsData.map(async (project) => {
            if (project.image) {
              try {
                const normalizedUrl = await normalizeImageUrl(project.image)
                return { ...project, image: normalizedUrl || project.image }
              } catch (error) {
                console.warn(`Failed to normalize image for project ${project.id}:`, error)
                return project
              }
            }
            return project
          })
        )
        
        setProjects(projectsWithNormalizedImages)
        
        // Debug: Log sample project images
        if (projectsWithNormalizedImages.length > 0) {
          console.log('Sample project images:', projectsWithNormalizedImages.slice(0, 3).map(p => ({
            id: p.id,
            title: p.title,
            image: p.image,
            imageType: typeof p.image,
            imageLength: p.image?.length
          })))
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError('Failed to load projects. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Retry
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
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain p-2"
                            fallbackText={project.image ? 'Image Failed to Load' : 'No Image Available'}
                          />
                          {/* Overlay with title on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                              <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                              <p className="text-white/90 text-sm">{project.category}</p>
                            </div>
                          </div>
                          {/* Status badge */}
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              project.status === 'completed' ? 'bg-green-500 text-white' :
                              project.status === 'ongoing' ? 'bg-blue-500 text-white' :
                              'bg-yellow-500 text-white'
                            }`}>
                              {project.status}
                            </span>
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
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {project.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {project.description}
                              </p>
                            </div>

                            {/* Project Info */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar size={16} />
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Category:</span>
                                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded text-xs font-medium">
                                  {project.category}
                                </span>
                              </div>
                            </div>

                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                  <Star size={16} className="text-primary-600" />
                                  Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

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

                            {/* Technical Structure */}
                            {project.structure && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                  <Clock size={16} className="text-primary-600" />
                                  Technical Structure
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                  {project.structure}
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

    </div>
  )
}