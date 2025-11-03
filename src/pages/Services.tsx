import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calculator, 
  Clock, 
  Building, 
  Users, 
  FileText,
  Calendar,
  GraduationCap,
  ArrowRight,
  X,
  LucideIcon
} from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
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
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
          <IconComponent size={20} className="text-primary-600" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">{service.title}</h3>
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
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
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

  const services: Service[] = [
    {
      icon: Calculator,
      title: 'Estimation & Costing',
      description: 'Accurate cost analysis and detailed estimation to ensure feasibility and budget control.',
      image: '/assets/Budget Estimation.jpeg',
    },
    {
      icon: Clock,
      title: 'Project Management',
      description: 'Efficiently manage resources, timelines, and risks to deliver successful projects.',
      image: '/assets/Project Management.jpg',
    },
    {
      icon: FileText,
      title: 'Detailed Project Report',
      description: 'Comprehensive project documentation for planning, execution, and funding approvals.',
      image: '/assets/DPR.jpeg',
    },
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
  ]

  const handleCardClick = (service: Service) => {
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

      {/* CTA Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get in touch with our team to discuss your engineering requirements and discover how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-sm px-4 py-2 inline-flex items-center justify-center"
              >
                Contact Us Today
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="btn-secondary text-sm px-4 py-2 inline-flex items-center justify-center"
              >
                View Our Portfolio
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
