const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },   
  type: {
    type: String,
    enum: ['text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox', 'radio', 'date'],
    default: 'text'
  },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  options: [{ type: String }],  
  order: { type: Number, default: 0 },
}, { _id: false })

const formSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },          
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, 
  description: { type: String },
  fields: [fieldSchema],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

formSchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
  next()
})

module.exports = mongoose.model('Form', formSchema)
