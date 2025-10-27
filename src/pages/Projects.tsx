import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  analysis?: string
  structure?: string
  estimation?: string
  status: 'completed' | 'ongoing' | 'planned'
  createdAt: string
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Web Application', 'E-Commerce', 'Enterprise Software', 'AI/ML', 'Portfolio Platform', 'Analytics Dashboard']

  // Sample projects data
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        title: 'SaaS Analytics Dashboard',
        description: 'A fullstack analytics tool built with MERN Stack, enabling real-time data insights and client management.',
        image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'Web Application',
        analysis: 'Comprehensive data analysis with real-time processing capabilities',
        structure: 'Microservices architecture with scalable database design',
        estimation: '6 months development, $50,000 budget',
        status: 'completed',
        createdAt: '2023-01-15'
      },
      {
        id: '2',
        title: 'E-Commerce Platform',
        description: 'A secure, scalable eCommerce app with Node.js backend and React frontend, optimized for global users.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        category: 'E-Commerce',
        analysis: 'Market analysis for global e-commerce trends',
        structure: 'Multi-tier architecture with payment integration',
        estimation: '8 months development, $75,000 budget',
        status: 'completed',
        createdAt: '2023-03-20'
      },
      {
        id: '3',
        title: 'Enterprise CRM Solution',
        description: 'Custom-built CRM platform for client tracking and communication, integrated with REST APIs and cloud services.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
        category: 'Enterprise Software',
        analysis: 'Business process analysis and workflow optimization',
        structure: 'Cloud-native architecture with API-first design',
        estimation: '10 months development, $100,000 budget',
        status: 'ongoing',
        createdAt: '2023-06-10'
      }
    ]
    setProjects(sampleProjects)
  }, [])

  const filteredProjects = projects.filter(project => 
    filter === 'All' || project.category === filter
  )

  const handleAddProject = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      image: '',
      technologies: [],
      category: '',
      analysis: '',
      structure: '',
      estimation: '',
      status: 'planned',
      createdAt: new Date().toISOString()
    })
    setIsModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const handleSaveProject = (project: Project) => {
    if (project.id) {
      setProjects(projects.map(p => p.id === project.id ? project : p))
    } else {
      const newProject = { ...project, id: Date.now().toString() }
      setProjects([...projects, newProject])
    }
    setIsModalOpen(false)
    setEditingProject(null)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Projects Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full border transition-colors duration-200 text-sm ${
                  filter === category
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-1 text-sm"
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      onClick={() => handleEditProject(project)}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Project Analysis</h3>
                  <p className="text-gray-600 mb-4">{selectedProject.analysis}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Architecture</h3>
                  <p className="text-gray-600">{selectedProject.structure}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Estimation</h3>
                  <p className="text-gray-600 mb-4">{selectedProject.estimation}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSaveProject(editingProject)
              }}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Save Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}