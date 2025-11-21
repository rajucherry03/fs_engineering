import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Careers } from './pages/Careers'
import { Others } from './pages/Others'
import { CompanyPolicy } from './pages/CompanyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/others" element={<Others />} />
                <Route path="/company-policy" element={<CompanyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
