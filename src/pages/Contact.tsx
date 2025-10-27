import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'Estimation & Costing',
    'Project Management',
    'Structural Design',
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical Systems',
    'Other',
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please write a short message.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', service: '', message: '' })
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-slate-900">Contact Us</h2>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Service Dropdown */}
              <div className="lg:col-span-2">
                <label htmlFor="service" className="block text-sm font-medium mb-1">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div className="lg:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your project or request..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="lg:col-span-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', email: '', service: '', message: '' })
                    setErrors({})
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm"
                >
                  Reset
                </button>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  className="lg:col-span-2 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="flex items-center gap-2">
                    <Mail size={16} />
                    Thanks — your message has been recorded. We'll respond soon.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone size={24} />
              </div>
              <h3 className="text-base font-semibold mb-2">Phone</h3>
              <p className="text-sm text-gray-600">+91 63029 91175</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail size={24} />
              </div>
              <h3 className="text-base font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-600">chilakapatil247@gmail.com</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} />
              </div>
              <h3 className="text-base font-semibold mb-2">Address</h3>
              <p className="text-sm text-gray-600">Plot #20, Hyderabad, Telangana, India</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
