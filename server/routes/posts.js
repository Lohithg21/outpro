const router = require('express').Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { status: 'published' }
    const posts = await Post.find(filter).sort({ createdAt: -1 }).select('-content')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, slug, category, excerpt, content, author, tags, status, coverImage } = req.body
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required.' })

    const post = new Post({ title, slug, category, excerpt, content, author, tags, status, coverImage })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'A post with this slug already exists.' })
    res.status(500).json({ error: 'Server error.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json({ message: 'Post deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
