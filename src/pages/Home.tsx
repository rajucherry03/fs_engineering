import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Clock, 
  Building, 
  Users, 
  Wrench, 
  Zap,
  ArrowRight,
  Star,
  LucideIcon,
  X
} from 'lucide-react'

// Types
interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

// Constants
const SERVICES: Service[] = [
  {
    icon: Calculator,
    title: 'Estimation & Costing',
    description: 'Accurate cost analysis and detailed estimation to ensure feasibility and budget control.',
    image: '/assets/Budget Estimation.jpeg',
  },
  {
    icon: Clock,
    title: 'Project Management',
    description: 'Comprehensive oversight from initiation to completion, ensuring projects are on time and within budget.',
    image: '/assets/Project Management.jpg',
  },
  {
    icon: Building,
    title: 'Structural Design',
    description: 'Innovative and safe structural designs for diverse building and infrastructure projects.',
    image: '/assets/Structural 1.jpeg',
  },
  {
    icon: Users,
    title: 'Civil Engineering',
    description: 'Expertise in infrastructure development, land use, and environmental planning.',
    image: '/assets/2d planning.png',
  },
  {
    icon: Wrench,
    title: 'Mechanical Engineering',
    description: 'Design and analysis of mechanical systems for performance and efficiency.',
    image: '/assets/image.png',
  },
  {
    icon: Zap,
    title: 'Electrical Systems',
    description: 'Advanced electrical design, distribution, and energy-efficient systems.',
    image: '/assets/Training 2.jpeg',
  },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Components
const HeroSection = () => (
  <section className="mt-20 pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/assets/header.png"
            alt="Engineering Illustration"
            className="w-full h-auto max-w-2xl mx-auto lg:mx-0"
          />
        </motion.div>
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-4">
            Bringing your <br />
            <span className="text-gradient font-extrabold" style={{ fontSize: 'calc(100% + 10px)' }}>Engineering Vision</span> to Life
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
            Comprehensive engineering solutions designed to meet the diverse needs of our clients with innovative planning and precise execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors text-sm"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

const AboutSection = () => (
  <section className="py-8 px-4 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Us
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 text-justify"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Welcome to <strong>FullStack Engineering Consultancy Services</strong>, a leading provider of
        comprehensive engineering solutions designed to meet the diverse needs of our clients. With a strong
        foundation in innovative planning and precise execution, we offer end-to-end services that ensure the
        successful delivery of your projects from inception to completion.
      </motion.p>
      <motion.p
        className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        At FullStack, we understand that every project is unique. Our team of highly skilled engineers and
        consultants work closely with clients to provide customized solutions across a wide range of engineering
        services.
      </motion.p>

      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Link
          to="/about"
          className="inline-block px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white font-medium rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition text-sm"
        >
          Read More
        </Link>
      </motion.div>
    </div>
  </section>
)

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

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            className="text-center mb-12"
            {...fadeInUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Expertise & Key Services</h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive engineering solutions tailored to your business requirements.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.title}
                service={service} 
                index={index}
                onClick={() => handleCardClick(service)}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <ServiceModal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  )
}

const CTASection = () => (
  <section className="px-4 py-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 text-center"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-3">Ready to Transform Your Business?</h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          Connect with our experts to discuss project requirements and discover how we can drive your success.
        </p>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-slate-800 dark:bg-slate-700 font-medium focus-ring text-sm hover:bg-slate-700 dark:hover:bg-slate-600"
          >
            Get in Touch
            <span className="ml-2">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

// Stats Section Component
const StatsSection = () => (
  <section className="py-8 bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-700 dark:to-blue-700">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {[
          { number: '500+', label: 'Projects Completed' },
          { number: '50+', label: 'Expert Engineers' },
          { number: '15+', label: 'Years Experience' },
          { number: '99%', label: 'Client Satisfaction' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

// Testimonials Section Component
const TestimonialsSection = () => (
  <section className="py-8 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">What Our Clients Say</h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied clients have to say about our services.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: 'Sarah Johnson',
            company: 'ABC Construction Ltd.',
            content: 'FullStack Engineering delivered exceptional results on our infrastructure project. Their attention to detail and professional approach exceeded our expectations.',
            rating: 5
          },
          {
            name: 'Michael Chen',
            company: 'XYZ Developers',
            content: 'The team\'s expertise in structural design helped us save costs while maintaining the highest quality standards. Highly recommended!',
            rating: 5
          },
          {
            name: 'Lisa Rodriguez',
            company: 'Metro Builders',
            content: 'Outstanding project management and timely delivery. FullStack Engineering made our complex project look effortless.',
            rating: 5
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <div key={i}>
                  <Star size={16} />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 italic">"{testimonial.content}"</p>
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{testimonial.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </div>
  )
}