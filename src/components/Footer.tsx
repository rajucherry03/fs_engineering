import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 pt-8 pb-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
        {/* Company Info */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-3">
            <img src="/assets/logo.png" alt="FSES Logo" className="w-10 h-10 mr-2" />
            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">FSES</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Delivering cutting-edge precision engineering solutions for mission-critical
            applications across strategic sectors with innovation and reliability.
          </p>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span> <span className="text-gray-700 dark:text-gray-300">Plot #20, Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span> <span className="text-gray-700 dark:text-gray-300">chilakapatil247@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span> <span className="text-gray-700 dark:text-gray-300">+91 63029 91175</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › Home Page
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › About
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › Services
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › Portfolio
              </Link>
            </li>
            <li>
              <Link to="/careers" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-600 dark:hover:text-primary-400 text-gray-700 dark:text-gray-300 flex items-center transition-colors">
                › Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Google Map */}
        <div>
          <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">Our Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.4567890123456!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjIiTiA3OMKwMjcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&q=Plot+20+Hyderabad+Telangana+India"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="FSES Location Map"
          ></iframe>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 border-t border-gray-300 dark:border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-6">
        <p>© 2025 FullStack Engineering Consultancy Services. All rights reserved.</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
