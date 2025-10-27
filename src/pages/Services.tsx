import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calculator, 
  Clock, 
  Building, 
  Users, 
  FileText,
  Calendar,
  GraduationCap,
  ArrowRight
} from 'lucide-react'

interface Service {
  icon: any
  title: string
  description: string
  image: string
}

export const Services = () => {
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
      image: '/assets/Scheduling.jpeg',
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

  const ServiceCard = ({ service, index }: { service: Service; index: number; key?: string }) => {
    const IconComponent = service.icon

    return (
      <motion.article
        className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <div className="relative h-32 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
            <IconComponent size={24} />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
          <Link
            to="/contact"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors text-sm"
          >
            Learn More →
          </Link>
        </div>
      </motion.article>
    )
  }

  return (
    <div className="min-h-screen pt-20">

      {/* Services Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
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
