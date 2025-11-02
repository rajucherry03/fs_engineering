import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Newspaper, 
  Headphones,
  ChevronRight,
  Star,
  Users,
  Award,
  Clock
} from 'lucide-react'

export const Others = () => {
  const [activeSection, setActiveSection] = useState('resources')

  const resources = [
    {
      title: 'Engineering Standards Guide',
      description: 'Comprehensive guide to engineering standards and best practices',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1250,
      rating: 4.8
    },
    {
      title: 'Project Management Templates',
      description: 'Ready-to-use templates for project planning and execution',
      type: 'ZIP',
      size: '5.1 MB',
      downloads: 890,
      rating: 4.9
    },
    {
      title: 'Cost Estimation Calculator',
      description: 'Excel-based calculator for accurate cost estimation',
      type: 'XLSX',
      size: '1.2 MB',
      downloads: 2100,
      rating: 4.7
    },
    {
      title: 'Safety Guidelines Manual',
      description: 'Complete safety guidelines for construction projects',
      type: 'PDF',
      size: '3.8 MB',
      downloads: 1560,
      rating: 4.9
    }
  ]

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive engineering services including structural design, project management, cost estimation, civil engineering, and more.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project duration varies based on complexity. Small projects may take 2-4 weeks, while large infrastructure projects can take 6-12 months.'
    },
    {
      question: 'Do you provide project updates?',
      answer: 'Yes, we provide regular progress reports and maintain open communication throughout the project lifecycle.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing is project-based and depends on scope, complexity, and timeline. Contact us for a detailed quote.'
    }
  ]

  const blogPosts = [
    {
      title: 'Future of Engineering: AI and Automation',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the engineering industry...',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology'
    },
    {
      title: 'Sustainable Construction Practices',
      excerpt: 'Best practices for environmentally friendly construction projects...',
      author: 'Michael Chen',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Sustainability'
    },
    {
      title: 'Project Management in Engineering',
      excerpt: 'Essential project management techniques for successful engineering projects...',
      author: 'Lisa Rodriguez',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Management'
    }
  ]

  const newsItems = [
    {
      title: 'Company Wins Engineering Excellence Award',
      date: '2024-01-20',
      type: 'Award'
    },
    {
      title: 'New Office Opening in Mumbai',
      date: '2024-01-18',
      type: 'Expansion'
    },
    {
      title: 'Partnership with Leading Tech Company',
      date: '2024-01-15',
      type: 'Partnership'
    }
  ]

  const sections = [
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'support', label: 'Support', icon: Headphones },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'news', label: 'News', icon: Newspaper }
  ]

  return (
    <div className="min-h-screen pt-20">

      {/* Navigation Tabs */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <IconComponent size={18} />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Resources Section */}
          {activeSection === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Engineering Resources</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FileText size={24} />
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{resource.type}</span>
                        <p className="text-xs text-gray-400">{resource.size}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                    </div>
                    <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Blog Section */}
          {activeSection === 'blog' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Latest Blog Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                          Read More <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* News Section */}
          {activeSection === 'news' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Latest News & Updates</h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {newsItems.map((news, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Newspaper size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{news.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{news.date}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {news.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Support Section */}
          {activeSection === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get Support</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Get instant help from our support team</p>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Start Chat
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Comprehensive guides and tutorials</p>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    View Docs
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Help Center</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Find answers to common questions</p>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Browse FAQ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
