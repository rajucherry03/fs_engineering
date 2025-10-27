import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-4">
            <img src="/assets/logo.png" alt="FSES Logo" className="w-10 h-10 mr-2" />
            <h3 className="text-xl font-bold text-primary-600">FSES</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Delivering cutting-edge precision engineering solutions for mission-critical
            applications across strategic sectors with innovation and reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-primary-600 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary-600 flex items-center transition-colors">
                › Home Page
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary-600 flex items-center transition-colors">
                › About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary-600 flex items-center transition-colors">
                › Services
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-primary-600 flex items-center transition-colors">
                › Projects
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-primary-600 flex items-center transition-colors">
                › Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore More */}
        <div>
          <h4 className="text-lg font-semibold text-primary-600 mb-4">Explore More</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/gallery" className="hover:text-primary-600 flex items-center transition-colors">
                › Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary-600 flex items-center transition-colors">
                › Contact Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 flex items-center transition-colors">
                › Clients
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-600 flex items-center transition-colors">
                › Products
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-primary-600 mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span> Plot #20, Hyderabad, Telangana, India
            </li>
            <li className="flex items-start gap-2">
              <span>✉️</span> chilakapatil247@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <span>📞</span> +91 63029 91175
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 px-6">
        <p>© 2025 FullStack Engineering Consultancy Services. All rights reserved.</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
