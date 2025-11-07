import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, Users, Award, Target, ArrowRight, Phone, Mail } from 'lucide-react'

export const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Our team consists of highly qualified engineers with years of industry experience.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards of quality in all our engineering solutions.',
    },
    {
      icon: Target,
      title: 'Client Focused',
      description: 'Every project is tailored to meet the specific needs and requirements of our clients.',
    },
  ]

  const workflow = [
    {
      step: '01',
      title: 'Analysis',
      description: 'Thorough analysis of client requirements, site conditions, and regulatory compliance to establish project foundation.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Innovative design concepts and architectural solutions that align with client vision and project objectives.',
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Advanced 3D modeling and detailed visualizations to ensure comprehensive project understanding.',
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Comprehensive construction documents and specifications to guide successful project execution.',
    },
  ]

  const services = [
    'Project Planning & Scheduling',
    'Estimation & Costing',
    'Structural Design & Analysis',
    '2D & 3D Architectural Plans',
    'Detailed Project Reports (DPR)',
    'Human Resource Supply',
    'Training on Design & PM Software',
    'Project Management'
  ]

  const whyChooseUs = [
    'Experienced & Qualified Team',
    'Cost-Effective & Timely Solutions',
    'Cutting-Edge Technology & Tools',
    'Commitment to Quality & Safety'
  ]

  return (
    <div className="min-h-screen pt-20">

      {/* About Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Choose FSES?</h3>
              <div className="space-y-3">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-primary-600 dark:text-primary-400 mr-2 mt-0.5">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Our Process</h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We follow a systematic approach to ensure quality and efficiency in every project
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary-600 text-2xl font-bold mb-3">{item.step}</div>
                <h3 className="text-base font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Why Choose Us</h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine technical expertise with innovative solutions to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-base font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">Get In Touch</h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to start your next project? Contact our team for a consultation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600">
                <Phone size={24} />
              </div>
              <h3 className="text-base font-semibold mb-2 dark:text-white">Phone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">+91 6302 91175</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600">
                <Mail size={24} />
              </div>
              <h3 className="text-base font-semibold mb-2 dark:text-white">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">chilakapatil247@gmail.com</p>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="btn-primary text-sm px-4 py-2 inline-flex items-center justify-center"
            >
              Contact Us Today
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
