import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

interface NavItem {
  path: string
  label: string
  subItems?: { path: string; label: string }[]
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 10 // Minimum scroll distance to trigger hide/show
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 0)
      
      // At the top of the page, always show navbar
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current + scrollThreshold) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
        // Scrolling up - show navbar
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
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
    { path: '/services', label: 'Services' },
    { 
      path: '/projects', 
      label: 'Portfolio'
    },
    { path: '/careers', label: 'Careers' },
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

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen)
    setActiveDropdown(null) // Close other dropdowns
  }

  const handleProfileClose = () => {
    setIsProfileOpen(false)
  }

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center px-4 py-2 lg:py-3 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src="/assets/logo.png" 
              alt="FullStack Logo" 
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div className="block">
              <h1 className="font-bold text-sm sm:text-base md:text-lg text-primary-600 dark:text-primary-400 leading-tight">
                FullStack Engineering
              </h1>
              <p className="text-xs sm:text-xs text-gray-600 dark:text-gray-300 leading-tight">Consultancy Services</p>
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
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all duration-200 min-h-[36px] ${
                        location.pathname === item.path
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown 
                        size={14} 
                      />
                    </button>
                    
                      {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={handleDropdownClose}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
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
                    className={`px-3 py-2 rounded-lg font-bold transition-all duration-200 min-h-[36px] flex items-center ${
                      location.pathname === item.path
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* User Authentication Section */}
            <div className="ml-2 flex items-center space-x-2">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={handleProfileToggle}
                    className="flex items-center space-x-2 text-sm hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 cursor-pointer">
                      <User size={16} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className={`text-gray-500 dark:text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <User size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {user.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-2 py-1">
                        <button
                          onClick={async (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            try {
                              await logout()
                              handleProfileClose()
                            } catch (error) {
                              console.error('Logout error:', error)
                            }
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors duration-200"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
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
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 min-h-[36px] flex items-center justify-center"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 min-h-[40px] ${
                          location.pathname === item.path
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
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
                      className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 min-h-[40px] flex items-center ${
                        location.pathname === item.path
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-left">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile User Authentication */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleDropdownToggle('profile')}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <User size={16} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email || 'No email'}</p>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-500 dark:text-gray-400 transition-transform ${activeDropdown === 'profile' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {activeDropdown === 'profile' && (
                      <div className="ml-4 space-y-2 relative z-50">
                        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Username</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {user.displayName || user.email?.split('@')[0] || 'N/A'}
                          </p>
                        </div>
                        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</p>
                          <p className="text-sm text-gray-900 dark:text-gray-100 break-all">
                            {user.email || 'N/A'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onTouchStart={async (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          onClick={async (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            try {
                              await logout()
                              setIsOpen(false)
                              handleDropdownClose()
                            } catch (error) {
                              console.error('Logout error:', error)
                            }
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 active:bg-red-100 dark:active:bg-red-900/40 rounded-lg transition-colors duration-200 touch-manipulation relative z-50"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 bg-primary-600 dark:bg-primary-500 text-white text-center rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 font-medium"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown - only for desktop */}
      {(activeDropdown || isProfileOpen) && (
        <div 
          className="hidden lg:block fixed inset-0 z-40" 
          onClick={() => {
            handleDropdownClose()
            handleProfileClose()
          }}
        />
      )}
    </header>
  )
}