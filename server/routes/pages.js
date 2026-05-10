const router = require('express').Router()
const Page = require('../models/Page')

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().sort({ slug: 1 })
    res.json(pages)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug })
    if (!page) return res.status(404).json({ error: 'Page content not found.' })
    res.json(page)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { slug, title, content } = req.body
    if (!slug) return res.status(400).json({ error: 'Slug is required.' })
    const page = new Page({ slug, title, content })
    await page.save()
    res.status(201).json(page)
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'A page block with this slug already exists.' })
    res.status(500).json({ error: 'Server error.' })
  }
})

router.put('/:slug', async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }  
    )
    res.json(page)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.delete('/:slug', async (req, res) => {
  try {
    await Page.findOneAndDelete({ slug: req.params.slug })
    res.json({ message: 'Page content deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
