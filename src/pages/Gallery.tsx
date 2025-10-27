import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import React, { useState } from 'react'

export const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  const projects = [
    {
      id: 1,
      title: 'Commercial Building Design',
      category: 'Architecture',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      description: 'Modern commercial building with sustainable design principles.',
      year: '2023',
    },
    {
      id: 2,
      title: 'Residential Complex',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury residential complex with premium amenities.',
      year: '2023',
    },
    {
      id: 3,
      title: 'Industrial Facility',
      category: 'Industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      description: 'State-of-the-art industrial manufacturing facility.',
      year: '2022',
    },
    {
      id: 4,
      title: 'Bridge Construction',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      description: 'Modern cable-stayed bridge with innovative design.',
      year: '2022',
    },
    {
      id: 5,
      title: 'Hospital Complex',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive healthcare facility with advanced medical infrastructure.',
      year: '2023',
    },
    {
      id: 6,
      title: 'Educational Campus',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      description: 'Modern educational campus with sustainable design.',
      year: '2023',
    },
    {
      id: 7,
      title: 'Shopping Mall',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1555529902-1c1a3b0b0b0b?auto=format&fit=crop&w=800&q=80',
      description: 'Multi-level shopping complex with entertainment facilities.',
      year: '2022',
    },
    {
      id: 8,
      title: 'Office Tower',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      description: 'High-rise office building with modern amenities.',
      year: '2023',
    },
  ]

  const categories = ['All', 'Architecture', 'Residential', 'Industrial', 'Infrastructure', 'Healthcare', 'Education', 'Commercial']

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-20">

      {/* Filters and Search */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full md:w-64 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                          {project.category}
                        </span>
                        <span className="text-gray-500 text-sm">{project.year}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 text-lg">No projects found matching your search criteria.</p>
            </motion.div>
          )}
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
          <h2 className="text-3xl font-bold mb-4">Interested in Our Work?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your engineering vision to life with our expertise and proven track record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Your Project
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              View More Projects
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
