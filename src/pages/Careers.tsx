import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Briefcase, ArrowRight } from 'lucide-react'

export const Careers = () => {
  const positions = [
    {
      title: 'Senior Structural Engineer',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead structural design projects and mentor junior engineers.',
      requirements: ['B.E/B.Tech in Civil Engineering', '5+ years experience', 'AutoCAD, STAAD.Pro', 'Strong analytical skills'],
    },
    {
      title: 'Project Manager',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Manage engineering projects from conception to completion.',
      requirements: ['B.E/B.Tech in Engineering', '3+ years PM experience', 'PMP certification preferred', 'Excellent communication skills'],
    },
    {
      title: 'Civil Engineer',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Work on infrastructure and construction projects.',
      requirements: ['B.E/B.Tech in Civil Engineering', '2+ years experience', 'AutoCAD, Civil 3D', 'Site experience preferred'],
    },
    {
      title: 'Mechanical Engineer',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design and analyze mechanical systems for various projects.',
      requirements: ['B.E/B.Tech in Mechanical Engineering', '3+ years experience', 'SolidWorks, ANSYS', 'Design optimization skills'],
    },
  ]

  const benefits = [
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Opportunities for professional development and advancement.',
    },
    {
      icon: Users,
      title: 'Team Environment',
      description: 'Collaborative work culture with experienced professionals.',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote work options.',
    },
    {
      icon: MapPin,
      title: 'Great Location',
      description: 'Modern office in the heart of Hyderabad.',
    },
  ]

  return (
    <div className="min-h-screen pt-20">

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a supportive environment where you can grow your career and make a real impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our current job openings and find the perfect role for your skills and interests.
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {position.experience}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 btn-primary flex items-center gap-2">
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{position.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-primary-600 text-white py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let us know how you can contribute to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Send Resume
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Contact HR
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
