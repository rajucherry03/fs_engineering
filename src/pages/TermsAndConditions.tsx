import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const TermsAndConditions = () => {
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
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            FSE Consultancy Services
          </p>
        </motion.div>

        {/* Terms and Conditions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="space-y-8">
            {/* Agreement Scope */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.1 Agreement Scope</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>The consultancy firm agrees to provide engineering services as outlined in the contract, including but not limited to site assessments, design, feasibility studies, cost estimation, and project management.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>The client agrees to provide all necessary information, access to the site, and assistance as required to facilitate the consultancy services.</span>
                </li>
              </ul>
            </div>

            {/* Fees and Payment Terms */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.2 Fees and Payment Terms</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>The fee for services will be agreed upon before commencing work. This can be based on hourly rates, project milestones, or fixed-price contracts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Payment will be due as per the schedule outlined in the agreement (e.g., upon completion of milestones, monthly payments, or a lump sum).</span>
                </li>
              </ul>
            </div>

            {/* Duration of the Agreement */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.3 Duration of the Agreement</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The contract duration will be defined based on the project requirements. Any extension to the timeline or changes to the scope of work must be agreed upon in writing by both parties.
              </p>
            </div>

            {/* Confidentiality */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.4 Confidentiality</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Both parties agree to keep all information, including proprietary designs, plans, and client data, confidential.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Information may only be shared with third parties with the consent of the client or as required by law.</span>
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.5 Intellectual Property</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>The intellectual property rights for all designs, reports, drawings, and other deliverables produced by the consultancy firm remain with the firm until full payment is received.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-3 font-bold">•</span>
                  <span>Upon receipt of full payment, the client may use these materials for the purpose outlined in the contract.</span>
                </li>
              </ul>
            </div>

            {/* Amendments */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.6 Amendments</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Any changes to these terms and conditions must be made in writing and agreed upon by both parties.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

