import React, { useState, useEffect } from 'react'
import { useAuth } from '../App'
import { Upload, Brain, Target, FileText, LogOut, Cloud, BarChart3, Award } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [currentResult, setCurrentResult] = useState(null)
  const [resumeHistory, setResumeHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = async () => {
    try {
      const res = await axios.get('/api/resumes')
      setResumeHistory(res.data.resumes || [])
    } catch (error) {
      console.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile)
    } else {
      toast.error('File too large (max 10MB)')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      const res = await axios.post('/api/resumes/upload', formData)
      setCurrentResult(res.data.resume)
      await loadResumes()
      toast.success('🎉 Analysis complete!')
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
      setFile(null)
      document.getElementById('resume-upload').value = ''
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-green-400 to-green-600'
    if (score >= 70) return 'from-blue-400 to-blue-600'
    if (score >= 55) return 'from-yellow-400 to-yellow-600'
    return 'from-red-400 to-red-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800">Loading Atlas Dashboard...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">ResumeParsePro</h1>
                <div className="flex items-center text-xs text-gray-500">
                  <Cloud className="h-3 w-3 mr-1" />Atlas Dashboard
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-800">{user?.name}</p>
              </div>
              <button onClick={logout} className="btn btn-ghost">
                <LogOut className="h-4 w-4 mr-2" />Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold text-gradient mb-4">
            Your Cloud-Powered Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            AI resume analysis with MongoDB Atlas cloud database
          </p>
        </div>

        {/* Upload Section */}
        <div className="card mb-12 animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Resume for AI Analysis</h3>
            <p className="text-gray-600">Real varying scores powered by cloud database</p>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            <div>
              <input
                id="resume-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="input text-center"
                disabled={uploading}
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                📄 PDF, DOC, DOCX, TXT • Max 10MB
              </p>
            </div>

            {file && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
                <p className="text-blue-800 flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {file.name} ({Math.round(file.size / 1024)}KB)
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="w-full btn btn-primary py-4 text-lg font-semibold"
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Atlas AI Processing...
                </div>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyze with Cloud AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Result */}
        {currentResult && (
          <div className="space-y-8 mb-12">
            {/* ATS Score */}
            <div className={`card bg-gradient-to-br ${getScoreColor(currentResult.atsScore)} text-white`}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">Atlas AI Analysis</h3>
                </div>
                <div className="text-6xl font-bold mb-2">{currentResult.atsScore}%</div>
                <div className="text-xl opacity-90">{currentResult.scoreGrade}</div>
              </div>
            </div>

            {/* Score Breakdown */}
            {currentResult.scoreBreakdown && (
              <div className="card">
                <div className="text-center mb-8">
                  <BarChart3 className="h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Detailed Breakdown</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(currentResult.scoreBreakdown).map(([category, score]) => (
                    <div key={category} className="bg-gray-50 p-6 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-2">{score}%</div>
                        <div className="text-sm font-medium text-gray-600 capitalize mb-4">
                          {category.replace('_', ' ')}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`bg-gradient-to-r ${getScoreColor(score)} h-3 rounded-full transition-all duration-1000`}
                            style={{ width: `${Math.min(score, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Tips */}
            {currentResult.optimizationTips && (
              <div className="card">
                <div className="text-center mb-8">
                  <Award className="h-16 w-16 bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">AI Recommendations</h3>
                </div>
                <div className="space-y-4">
                  {currentResult.optimizationTips.map((tip, index) => (
                    <div key={index} className="flex items-start bg-blue-50 p-6 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 font-medium">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resume History */}
        <div className="card">
          <div className="text-center mb-8">
            <FileText className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Atlas Storage ({resumeHistory.length})</h3>
            <p className="text-gray-600">Your analysis history stored securely in the cloud</p>
          </div>

          {resumeHistory.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h4 className="text-xl font-semibold text-gray-500 mb-2">No analyses yet</h4>
              <p className="text-gray-400">Upload your first resume to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeHistory.map((resume) => (
                <div key={resume._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border hover-lift">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{resume.filename}</h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Cloud className="h-3 w-3 mr-1" />
                        Stored in Atlas • {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${resume.atsScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {resume.atsScore}%
                    </div>
                    <button
                      onClick={() => setCurrentResult(resume)}
                      className="btn btn-primary mt-2"
                    >
                      View Analysis
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}