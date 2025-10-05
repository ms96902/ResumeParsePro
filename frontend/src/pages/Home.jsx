import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { Brain, Shield, Cloud, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">ResumeParsePro</h1>
                <p className="text-xs text-gray-500">MongoDB Atlas Edition</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-600">Hi, {user.name}!</span>
                  <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
                  <button onClick={logout} className="btn btn-ghost">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost">Sign In</Link>
                  <Link to="/register" className="btn btn-primary">
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center text-white">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                🌐 MongoDB Atlas • No Local Database Required!
              </span>
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              Beautiful AI Resume Analysis
              <br />
              <span className="text-yellow-300">With Cloud Database</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
              Experience stunning design with MongoDB Atlas cloud database. 
              Real user registration, varying AI scores, and beautiful modern interface.
            </p>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/register" className="btn btn-secondary text-lg px-10 py-4">
                  <Users className="h-5 w-5 mr-2" />
                  Start Free Analysis
                </Link>
                <Link to="/login" className="btn text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-800">
                  Sign In
                </Link>
              </div>
            ) : (
              <Link to="/dashboard" className="btn btn-secondary text-lg px-10 py-4">
                Go to Dashboard
              </Link>
            )}

            <div className="flex justify-center gap-8 mt-12 text-sm opacity-80">
              <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Cloud Database</div>
              <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Real AI Analysis</div>
              <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Beautiful Design</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gradient mb-6">
              Why Choose ResumeParsePro Atlas?
            </h2>
            <p className="text-xl text-gray-600">
              Cloud database, beautiful design, and real AI analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center hover-lift">
              <Cloud className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">MongoDB Atlas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ No local MongoDB installation</li>
                <li>✅ Cloud database (free tier)</li>
                <li>✅ Auto-scaling and backups</li>
                <li>✅ Global performance</li>
              </ul>
            </div>

            <div className="card text-center hover-lift">
              <Brain className="h-16 w-16 bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Real AI Analysis</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Varying scores (35-95%)</li>
                <li>✅ Skills extraction</li>
                <li>✅ Professional language analysis</li>
                <li>✅ Optimization recommendations</li>
              </ul>
            </div>

            <div className="card text-center hover-lift">
              <Sparkles className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Beautiful Design</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Modern gradient backgrounds</li>
                <li>✅ Smooth animations</li>
                <li>✅ Glass-morphism effects</li>
                <li>✅ Responsive for all devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 hero-gradient text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join professionals using cloud-powered AI resume analysis
          </p>

          {!user && (
            <Link to="/register" className="btn btn-secondary text-xl px-12 py-4">
              <Cloud className="h-6 w-6 mr-2" />
              Create Atlas Account
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}