const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  atsScore: { type: Number, min: 0, max: 100 },
  scoreGrade: String,
  scoreBreakdown: {
    content_quality: Number, structure_formatting: Number,
    completeness: Number, professional_language: Number, readability: Number
  },
  skills: { type: mongoose.Schema.Types.Mixed, default: {} },
  experienceYears: { type: Number, default: 0 },
  contactInfo: { emails: [String], phones: [String], linkedin: String },
  optimizationTips: [String],
  analysisMetadata: {
    wordCount: Number, processingMode: String, 
    processedAt: Date, analysisVersion: String
  },
  fileSize: Number,
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

resumeSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model('Resume', resumeSchema);