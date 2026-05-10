const mongoose = require('mongoose')

const formSubmissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  formSlug: { type: String, required: true },   
  formName: { type: String },
  data: { type: Map, of: String },              
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('FormSubmission', formSubmissionSchema)
