import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface NavItem {
  path: string
  label: string
  subItems?: { path: string; label: string }[]
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { 
      path: '/about', 
      label: 'About Us',
      subItems: [
        { path: '/about', label: 'Our Story' },
        { path: '/about#team', label: 'Our Team' },
        { path: '/about#mission', label: 'Mission & Vision' }
      ]
    },
    { 
      path: '/services', 
      label: 'Services',
      subItems: [
        { path: '/services#estimation', label: 'Estimation & Costing' },
        { path: '/services#project-management', label: 'Project Management' },
        { path: '/services#structural', label: 'Structural Design' },
        { path: '/services#civil', label: 'Civil Engineering' },
        { path: '/services#mechanical', label: 'Mechanical Engineering' },
        { path: '/services#electrical', label: 'Electrical Systems' }
      ]
    },
    { 
      path: '/projects', 
      label: 'Projects',
      subItems: [
        { path: '/projects#completed', label: 'Completed Projects' },
        { path: '/projects#ongoing', label: 'Ongoing Projects' },
        { path: '/projects#portfolio', label: 'Portfolio' }
      ]
    },
    { path: '/gallery', label: 'Gallery' },
    { 
      path: '/careers', 
      label: 'Careers',
      subItems: [
        { path: '/careers#openings', label: 'Job Openings' },
        { path: '/careers#benefits', label: 'Benefits' },
        { path: '/careers#culture', label: 'Company Culture' }
      ]
    },
    { path: '/contact', label: 'Contact Us' },
    { 
      path: '/others', 
      label: 'Others',
      subItems: [
        { path: '/others#resources', label: 'Resources' },
        { path: '/others#downloads', label: 'Downloads' },
        { path: '/others#support', label: 'Support' },
        { path: '/others#faq', label: 'FAQ' },
        { path: '/others#blog', label: 'Blog' },
        { path: '/others#news', label: 'News & Updates' }
      ]
    },
  ]

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
  }

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center px-4 py-2 lg:py-3 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src="/assets/logo.png" 
              alt="FullStack Logo" 
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div className="hidden sm:block">
              <h1 className="font-bold text-base md:text-lg text-primary-600 leading-tight">
                FullStack Engineering
              </h1>
              <p className="text-xs text-gray-600 leading-tight">Consultancy Services</p>
            </div>
          </Link>

          {/* Spacer for proper alignment */}
          <div className="flex-1 min-w-4"></div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium transition-all duration-200 min-h-[36px] ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown 
                        size={14} 
                      />
                    </button>
                    
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={handleDropdownClose}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 min-h-[36px] flex items-center ${
                      location.pathname === item.path
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* User Authentication Section */}
            <div className="ml-4 flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <User size={16} />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 min-h-[36px] flex items-center justify-center"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[40px] ${
                          location.pathname === item.path
                            ? 'bg-primary-100 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-left">{item.label}</span>
                        <ChevronDown 
                          size={16} 
                        />
                      </button>
                      
                      {activeDropdown === item.label && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => {
                                setIsOpen(false)
                                handleDropdownClose()
                              }}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 min-h-[40px] flex items-center ${
                        location.pathname === item.path
                          ? 'bg-primary-100 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-left">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile User Authentication */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleDropdownClose}
        />
      )}
    </header>
  )
}