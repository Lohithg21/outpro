# Outpro.India — Corporate Website (MERN Stack)

> Major Internship Project | Outpro.India Corporate Website

## Project Overview

A full-stack corporate website built with the MERN stack (MongoDB, Express, React, Node.js) as per the technical specification provided.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, React Router v6 |
| Styling | Plain CSS (CSS variables, no UI framework) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| Fonts | Google Fonts (Syne + DM Sans) |

---

## Project Structure

```
outpro/               ← React frontend (Vite)
  src/
    App.jsx           ← Router setup
    index.css         ← Global styles + variables
    components/
      Navbar.jsx      ← Responsive nav with hamburger menu
      Footer.jsx      ← Footer with links
    pages/
      Home.jsx        ← Landing page: hero, stats, services, testimonials, CTA
      Services.jsx    ← 8 service cards + 5-step process
      Portfolio.jsx   ← Filterable project grid
      About.jsx       ← Team, values, story
      Contact.jsx     ← Form with validation + API integration

outpro-server/        ← Express backend
  server.js           ← App entry, MongoDB connection
  models/
    Contact.js        ← Mongoose schema for form submissions
  routes/
    contact.js        ← POST /api/contact, GET /api/contact
  .env.example        ← Environment variable template
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats bar, services overview, testimonials, CTA |
| `/services` | Services | 8 detailed service cards + delivery process |
| `/portfolio` | Portfolio | Filterable project grid by category |
| `/about` | About | Company story, values, team members |
| `/contact` | Contact | Form with client + server validation, saves to MongoDB |

---

## Setup & Running

### Frontend
```bash
cd outpro
npm install
npm run dev       # runs on http://localhost:5173
npm run build     # production build to /dist
```

### Backend
```bash
cd outpro-server
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:5000 (uses nodemon)
```

### Environment Variables (server)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/outpro
CLIENT_URL=http://localhost:5173
EMAIL_USER=your@gmail.com        # optional: for nodemailer email alerts
EMAIL_PASS=your_app_password
```

---

## API Endpoints

### POST /api/contact
Submit a contact form entry.

**Request body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@company.com",
  "phone": "+91 98765 43210",
  "service": "Web Development",
  "budget": "₹1,00,000 – ₹3,00,000",
  "message": "We need a corporate website..."
}
```

**Response (201):**
```json
{ "message": "Contact form submitted successfully.", "id": "..." }
```

### GET /api/contact
Returns all form submissions (for admin/internal use).

---

## Integrations Referenced in Spec

| Integration | Status |
|---|---|
| Google Analytics 4 | Ready — add `react-ga4`, replace `G-XXXXXXXXXX` in App.jsx |
| Google Search Console | Add `meta` verification tag to `index.html` |
| HubSpot / Zoho CRM | Contact route ready for webhook POST |
| Tawk.to Live Chat | Add embed script to `index.html` `<body>` |
| Mailchimp Newsletter | Add Mailchimp embed form or API call |

---

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd outpro
npm run build
# Upload /dist folder or connect Git repo to Vercel
```
Set `VITE_API_URL` environment variable in Vercel to your backend URL.

### Backend (Railway / Render / AWS EC2)
```bash
cd outpro-server
# Set environment variables in your hosting dashboard
npm start
```

### Vercel `vercel.json` (if deploying both on Vercel)
```json
{ "rewrites": [{ "source": "/api/(.*)", "destination": "https://your-backend.com/api/$1" }] }
```

---

## Database Schema

### Contact Collection
| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | Yes | trimmed |
| email | String | Yes | lowercase, trimmed |
| phone | String | No | |
| service | String | No | |
| budget | String | No | |
| message | String | Yes | |
| status | String | No | enum: new, read, replied |
| createdAt | Date | Auto | |

---

## Spec Compliance

| Requirement | Status |
|---|---|
| React.js frontend | ✅ |
| Node.js backend | ✅ |
| MongoDB database | ✅ |
| Fully responsive (Mobile/Tablet/Desktop) | ✅ |
| Contact form with validation | ✅ |
| GA4 integration point | ✅ (placeholder) |
| Source code via Git repo | ✅ |
| Technical documentation | ✅ (this README) |
| Database schema | ✅ (above) |

---

## Notes for Presenter

- CSS variables are defined in `index.css :root` — changing brand colors is a one-line edit
- No component library used — all CSS written from scratch (demonstrates understanding)
- Vite proxy config in `vite.config.js` routes `/api` calls to backend during development
- The contact form saves to MongoDB and is ready for email notifications (nodemailer template commented in)
