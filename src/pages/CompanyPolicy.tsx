import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const CompanyPolicy = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Company Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            FSE Consultancy Services
          </p>
        </motion.div>

        {/* Company Policy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="space-y-8">
            {/* Introduction */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.1 Introduction</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This policy outlines the principles and practices that govern our operations and interactions with clients, employees, contractors, and other stakeholders. As an engineering consultancy firm, we are committed to delivering high-quality, sustainable, and cost-effective solutions while maintaining integrity and professionalism.
              </p>
            </div>

            {/* Mission Statement */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.2 Mission Statement</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our mission is to provide expert engineering consultancy services that exceed client expectations by offering innovative, practical, and reliable solutions, all while adhering to ethical, legal, and environmental standards.
              </p>
            </div>

            {/* Code of Conduct */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.3 Code of Conduct</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Professionalism:</strong> All employees and consultants are expected to perform their duties with the utmost professionalism, ensuring the safety, health, and welfare of all stakeholders.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Integrity:</strong> We conduct business with honesty, transparency, and accountability. Conflicts of interest must be disclosed and avoided.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Compliance:</strong> We comply with all relevant laws, codes, and standards governing civil engineering projects, including environmental regulations, health and safety requirements, and labor laws.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Sustainability:</strong> We aim to integrate environmentally sustainable practices into our designs and recommendations, minimizing adverse environmental impacts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Confidentiality:</strong> We respect client confidentiality and handle all sensitive information in a secure and ethical manner.</span>
                </li>
              </ul>
            </div>

            {/* Health and Safety */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.4 Health and Safety</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>All engineers and consultants must adhere to safety protocols to ensure the safety of workers, clients, and the public during the execution of engineering projects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Health and safety assessments will be carried out for all projects, and safety plans will be developed accordingly.</span>
                </li>
              </ul>
            </div>

            {/* Quality Assurance */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.5 Quality Assurance</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>We employ a systematic approach to quality management that includes regular audits, risk management, and project reviews to ensure high standards of design and construction.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>All designs and recommendations are peer-reviewed and must meet client specifications and applicable engineering standards.</span>
                </li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.6 Dispute Resolution</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>In the event of a disagreement or dispute, we encourage open communication and aim to resolve issues amicably through negotiation or mediation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>If a resolution cannot be reached, the matter may be referred to arbitration or legal action, as per the jurisdiction agreed upon in the contract.</span>
                </li>
              </ul>
            </div>

            {/* Environmental Policy */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.7 Environmental Policy</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>We prioritize sustainable design solutions and aim to minimize the carbon footprint of our projects.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Compliance with local, national, and international environmental regulations is a key part of our project execution.</span>
                </li>
              </ul>
            </div>

            {/* Conflicts of Interest */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1.8 Conflicts of Interest</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Employees and consultants must disclose any potential conflicts of interest before engaging in projects. Conflicts must be addressed in a manner that ensures unbiased decision-making.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

