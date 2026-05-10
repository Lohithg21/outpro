const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, 
  title: { type: String },
  content: { type: mongoose.Schema.Types.Mixed },       
  active: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
})

pageSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('Page', pageSchema)
