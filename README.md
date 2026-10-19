# Mehul Maheshwari — Portfolio

A responsive personal portfolio built with React, Vite, Express, and MongoDB, featuring an elegant Espresso & Champagne theme. The website showcases my background, skills, projects, certifications, and contact information.

## Features

- **Hero:** Animated introduction with typewriter effects.
- **About:** Personal introduction and background.
- **Education & Experience:** Academic and professional timeline.
- **Certifications:** Certificate gallery with image previews.
- **Skills:** Categorized technical skills.
- **Projects:** Interactive project cards with detailed previews.
- **Contact:** Validated contact form backed by MongoDB.
- **Resume:** PDF and DOCX downloads through the backend API.
- **Theme:** Persistent dark and light modes.
- **Responsive Design:** Layouts optimized for desktop and mobile.

## Tech Stack

| Frontend | Backend | Database |
|---|---|---|
| React 18 | Node.js | MongoDB |
| Vite 6 | Express 4 | Mongoose 8 |
| React Router | REST API | |
| Framer Motion | dotenv, CORS | |
| Vanilla CSS | | |

## Project Structure

```text
mehul-portfolio-starter/
├── client/
│   ├── public/
│   │   ├── certificates/
│   │   ├── projects/
│   │   ├── logo-dark.png
│   │   ├── logo-light.png
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── resumes/
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- MongoDB local instance or MongoDB Atlas account

### Installation

Clone the repository and install the dependencies:

```bash
git clone <YOUR_REPOSITORY_URL>
cd mehul-portfolio-starter

npm --prefix client install
npm --prefix server install
```

### Environment Variables

Create local environment files from the examples.

**Frontend — `client/.env`**

```env
VITE_API_URL=http://localhost:5001
```

**Backend — `server/.env`**

```env
PORT=5001
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
```

Use the actual variable names defined in the project's `.env.example` files. Replace the example values with your local configuration. Never commit real credentials.

### Run Locally

Start the backend in one terminal:

```bash
npm --prefix server run dev
```

Start the frontend in another terminal:

```bash
npm --prefix client run dev
```

Open the frontend at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Server health check |
| POST | `/api/contact` | Submit a contact message |
| GET | `/api/resume/pdf` | Download the PDF resume |
| GET | `/api/resume/docx` | Download the DOCX resume |

The contact endpoint validates submissions and stores them in MongoDB. Database-dependent requests may be unavailable if the database is not configured or connected.

## Production Build

Build the frontend:

```bash
npm --prefix client run build
```

The production files are generated in `client/dist/`.

Start the backend using its production script:

```bash
npm --prefix server start
```

## Deployment

The frontend and backend can be deployed independently.

- **Frontend:** Vercel, Netlify, or Cloudflare Pages.
- **Backend:** Render or Railway.
- **Database:** MongoDB Atlas.

Configure `VITE_API_URL` with the deployed backend URL. Set `FRONTEND_URL` to the deployed frontend's origin and configure `MONGODB_URI` through the backend hosting provider's environment settings.

Ensure the frontend host supports SPA routing. Add the resume files to the deployed backend if resume downloads are required.

## Security

- Keep `.env` files and credentials out of Git.
- Commit `.env.example` files containing placeholders only.
- Never expose database credentials or private API keys in frontend code.
- Keep dependencies and lockfiles organized.

---

**Built by Mehul Maheshwari**
