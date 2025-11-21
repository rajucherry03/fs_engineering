import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 pt-8 pb-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-4">
            <img src="/assets/logo.png" alt="FSES Logo" className="w-10 h-10 mr-2" />
            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">FSES</h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Delivering cutting-edge precision engineering solutions for mission-critical
            applications across strategic sectors with innovation and reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base font-semibold text-primary-600 dark:text-primary-400 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/careers" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-base font-semibold text-primary-600 dark:text-primary-400 mb-4">Contact Us</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">✉️</span>
              <span className="text-gray-700 dark:text-gray-300">chilakapatil247@gmail.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary-600 dark:text-primary-400 mt-0.5">📞</span>
              <span className="text-gray-700 dark:text-gray-300">+91 63029 91175</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-6">
        <p>© 2025 FullStack Engineering Consultancy Services. All rights reserved.</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <Link to="/company-policy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
