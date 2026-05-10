
require('dotenv').config()
const mongoose = require('mongoose')
const Form = require('./models/Form')
const Post = require('./models/Post')

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb:
  console.log('Connected to MongoDB')

  
  await Form.deleteOne({ slug: 'contact' })
  await Form.create({
    name: 'Contact Form',
    slug: 'contact',
    description: 'Main website contact form',
    fields: [
      { label: 'Full Name', name: 'name', type: 'text', required: true, order: 1 },
      { label: 'Email Address', name: 'email', type: 'email', required: true, order: 2 },
      { label: 'Phone', name: 'phone', type: 'tel', required: false, order: 3 },
      { label: 'Service Needed', name: 'service', type: 'select', required: false, order: 4,
        options: ['Web Development', 'UI/UX Design', 'SEO & Analytics', 'Maintenance & Support', 'Other'] },
      { label: 'Budget', name: 'budget', type: 'select', required: false, order: 5,
        options: ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹3,00,000', '₹3,00,000+', 'Not sure'] },
      { label: 'Message', name: 'message', type: 'textarea', required: true, order: 6 },
    ],
  })
  console.log('✓ Contact form seeded')

  
  await Form.deleteOne({ slug: 'newsletter' })
  await Form.create({
    name: 'Newsletter Signup',
    slug: 'newsletter',
    description: 'Footer newsletter subscription',
    fields: [
      { label: 'Your Name', name: 'name', type: 'text', required: true, order: 1 },
      { label: 'Email Address', name: 'email', type: 'email', required: true, order: 2 },
    ],
  })
  console.log('✓ Newsletter form seeded')

  
  await Form.deleteOne({ slug: 'job-application' })
  await Form.create({
    name: 'Job Application',
    slug: 'job-application',
    description: 'Careers page application form',
    fields: [
      { label: 'Full Name', name: 'name', type: 'text', required: true, order: 1 },
      { label: 'Email', name: 'email', type: 'email', required: true, order: 2 },
      { label: 'Phone', name: 'phone', type: 'tel', required: true, order: 3 },
      { label: 'Position Applied For', name: 'position', type: 'select', required: true, order: 4,
        options: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'SEO Analyst', 'Other'] },
      { label: 'Years of Experience', name: 'experience', type: 'select', required: true, order: 5,
        options: ['0-1 years', '1-3 years', '3-5 years', '5+ years'] },
      { label: 'Portfolio / GitHub URL', name: 'portfolio', type: 'text', required: false, order: 6 },
      { label: 'Cover Note', name: 'coverNote', type: 'textarea', required: false, order: 7 },
    ],
  })
  console.log('✓ Job application form seeded')

  
  await Post.deleteOne({ slug: 'why-pagespeed-matters' })
  await Post.create({
    title: 'Why PageSpeed Score Matters for Your Business',
    slug: 'why-pagespeed-matters',
    category: 'Performance',
    excerpt: 'A slow website costs you leads. Here is why PageSpeed 90+ should be non-negotiable.',
    content: `Google uses page speed as a ranking signal. A 1-second delay in load time can reduce conversions by 7%. 
    
We target PageSpeed 90+ on Mobile and 95+ on Desktop for every project by implementing lazy loading, 
CDN delivery via Cloudflare, minified CSS/JS bundles, and next-gen image formats.

The result: faster sites rank higher, convert better, and retain users longer.`,
    author: 'Arjun Mehta',
    tags: ['performance', 'SEO', 'PageSpeed'],
    status: 'published',
  })
  console.log('✓ Sample post seeded')

  await mongoose.disconnect()
  console.log('\nSeeding complete.')
}

seed().catch(err => { console.error(err); process.exit(1) })
