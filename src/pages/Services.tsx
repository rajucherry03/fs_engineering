import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Building, 
  Users, 
  Calendar,
  GraduationCap,
  ArrowRight,
  X,
  LucideIcon,
  DollarSign,
  FileText,
  Briefcase
} from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  image?: string
  redirectToContact?: boolean
}

const ServiceCard = ({ service, index, onClick }: { service: Service; index: number; onClick: () => void }) => {
  const IconComponent = service.icon

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
        {service.image ? (
          <>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full inline-block mb-4">
                <IconComponent size={48} className="text-white" />
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
          <IconComponent size={20} className="text-primary-600" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${service.image ? 'text-white drop-shadow-lg' : 'text-white drop-shadow-lg'}`}>
            {service.title}
          </h3>
        </div>
      </div>
    </motion.article>
  )
}

const ServiceModal = ({ service, isOpen, onClose }: { service: Service | null; isOpen: boolean; onClose: () => void }) => {
  if (!service) return null
  const IconComponent = service.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  {service.image ? (
                    <>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full inline-block">
                          <IconComponent size={64} className="text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                    aria-label="Close modal"
                  >
                    <X size={20} className="text-gray-900" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                        <IconComponent size={24} className="text-primary-600" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{service.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Get in Touch
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const services: Service[] = [
    {
      icon: Building,
      title: 'Structural Design & Analysis',
      description: 'Safe and optimized structural designs using advanced analysis techniques and tools.',
      image: '/assets/Structural 1.jpeg',
    },
    {
      icon: Building,
      title: '2D, 3D Architectural Plans & Elevations',
      description: 'Creative and technical design solutions with detailed 2D drawings and 3D visualizations.',
      image: '/assets/2d planning.png',
    },
    {
      icon: Calendar,
      title: 'Project Planning & Scheduling',
      description: 'Strategic timelines and schedules to ensure smooth execution and on-time delivery.',
      image: '/assets/image.png',
    },
    {
      icon: GraduationCap,
      title: 'Training on Design & PM Software',
      description: 'Hands-on training in industry-standard design and project management tools and software.',
      image: '/assets/Training 2.jpeg',
    },
    {
      icon: Users,
      title: 'Human Resources',
      description: 'Efficient HR services including recruitment, training, and workforce management for project success.',
      image: '/assets/HumanResource.jpeg',
    },
    {
      icon: DollarSign,
      title: 'Estimation & Costing',
      description: 'Accurate assessment of project quantities and costs ensures effective budgeting and financial control.',
      image: '/assets/analysis.jpg',
    },
    {
      icon: FileText,
      title: 'Detailed Project Report (DPR)',
      description: 'Comprehensive documentation covering technical, financial, and operational details for clear project planning.',
      image: '/assets/ana2.jpg',
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'Systematic coordination of resources, schedules, and processes to achieve defined project objectives.',
      image: '/assets/pm.jpg',
    },
  ]

  const handleCardClick = (service: Service) => {
    // If service has redirectToContact flag, redirect to contact page
    if (service.redirectToContact) {
      navigate('/contact')
      return
    }
    // Otherwise, open modal as usual
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedService(null), 300)
  }, [])

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
      {/* Vision & Mission Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision & Mission
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                To create sustainable, safe, and resilient infrastructure that enhances quality of life and preserves the environment for future generations.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                To serve clients and communities through eco-conscious design, precise engineering, and responsible project execution—ensuring every structure we plan stands as a symbol of sustainability and integrity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                service={service} 
                index={index}
                onClick={() => handleCardClick(service)}
              />
            ))}
          </div>
        </div>
      </section>
      
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  )
}
