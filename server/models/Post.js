const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, default: 'General' },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: { type: String, default: 'Outpro Team' },
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

postSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

postSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
  next()
})

module.exports = mongoose.model('Post', postSchema)
