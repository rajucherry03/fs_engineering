import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Clock, 
  Building, 
  Users, 
  Wrench, 
  Zap,
  ArrowRight,
  Star,
  LucideIcon
} from 'lucide-react'

// Types
interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

interface Project {
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
    image: '/assets/Scheduling.jpeg',
  },
  {
    icon: Zap,
    title: 'Electrical Systems',
    description: 'Advanced electrical design, distribution, and energy-efficient systems.',
    image: '/assets/Training 2.jpeg',
  },
]

const PROJECTS: Project[] = [
  {
    title: 'SaaS Analytics Dashboard',
    description: 'A fullstack analytics tool built with MERN Stack, enabling real-time data insights and client management.',
    image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A secure, scalable eCommerce app with Node.js backend and React frontend, optimized for global users.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Enterprise CRM Solution',
    description: 'Custom-built CRM platform for client tracking and communication, integrated with REST APIs and cloud services.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'Integrated AI chatbot for enterprise support using Python, Flask, and OpenAI API, improving response time by 70%.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Freelancer Portfolio Hub',
    description: 'A multi-user portfolio builder web app using Next.js and MongoDB with smooth UI animations and SEO optimization.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Consulting Analytics Portal',
    description: 'A powerful internal portal for tracking consultancy KPIs with authentication, dashboards, and real-time updates.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
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
  <section className="mt-20 pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-4">
            Bringing your <br />
            <span className="text-gradient font-extrabold">Engineering Vision</span> to Life
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl">
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
  <section className="py-8 px-4 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 text-center"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Us
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-gray-600 mb-4 text-justify"
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
        className="text-sm md:text-base text-gray-600 text-justify"
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
          className="inline-block px-4 py-2 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition text-sm"
        >
          Read More
        </Link>
      </motion.div>
    </div>
  </section>
)

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const IconComponent = service.icon
  
  return (
    <motion.article
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
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
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
          <IconComponent size={16} />
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

const ServicesSection = () => (
  <section className="bg-white">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        className="text-center"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">Our Expertise & Key Services</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Comprehensive engineering solutions tailored to your business requirements.
        </p>
      </motion.div>

      <motion.div 
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {SERVICES.map((service, index) => (
          <motion.div key={service.title}>
            <ServiceCard service={service} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-32 object-cover"
    />
    <div className="p-4">
      <h3 className="text-base font-semibold mb-2">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
      <Link
        to="/contact"
        className="inline-block bg-blue-600 text-white py-1.5 px-4 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        Get in Touch
      </Link>
    </div>
  </motion.div>
)

const ProjectsSection = () => (
  <section className="py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-6"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">Our Projects</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Explore some of the impactful solutions we've built for our clients — from scalable web platforms to
          AI-powered dashboards.
        </p>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {PROJECTS.map((project, index) => (
          <motion.div key={project.title}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

const CTASection = () => (
  <section className="px-4 py-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-gradient-to-br from-white to-slate-50 rounded-lg p-6 text-center"
        {...fadeInUp}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">Ready to Transform Your Business?</h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-4">
          Connect with our experts to discuss project requirements and discover how we can drive your success.
        </p>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-slate-800 font-medium focus-ring text-sm"
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
  <section className="py-8 bg-gradient-to-r from-primary-600 to-blue-600">
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
  <section className="py-8 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">What Our Clients Say</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
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
            className="bg-white rounded-lg shadow-md p-4"
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
            <p className="text-sm text-gray-600 mb-3 italic">"{testimonial.content}"</p>
            <div>
              <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-xs text-gray-500">{testimonial.company}</div>
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
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}