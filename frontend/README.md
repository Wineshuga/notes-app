# Notes App (Frontend)

A simple React frontend for a serverless Notes application. It allows authenticated users to view and manage notes via an AWS API Gateway + Lambda backend.

---

## Features

* View all notes
* Fetch notes from backend API
* Cloudflare Access authentication support (when enabled)
* Simple UI built with React

---

## Tech Stack

* React (Vite)
* JavaScript
* Fetch API
* Cloudflare Access (optional authentication layer)
* AWS API Gateway + Lambda backend

---

## Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <frontend-folder>
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root of the frontend project:

```env
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/Prod
```

---

### 4. Update API base URL

In `src/api.js` (or equivalent):

```js
const API_BASE = import.meta.env.VITE_API_URL;
export default API_BASE;
```

---

### 5. Run development server

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

## Production Deployment (Netlify)

1. Push project to GitHub
2. Connect repository to Netlify
3. Set build settings:

   * Build command: `npm run build`
   * Publish directory: `dist`
4. Add environment variable:

   * `VITE_API_URL = your AWS API Gateway URL`

---

## Authentication (Cloudflare Access)

If enabled:

* Users will be required to log in via Cloudflare Access before accessing the frontend.
* Authentication is handled at the edge (not inside the React app).
* No additional frontend login logic is required.

---

## Backend Requirement

This frontend expects a working backend with:

* AWS API Gateway
* Lambda functions (CRUD)
* DynamoDB table: `Notes`

---

## Notes

* Ensure CORS is enabled on the backend.
* Ensure API Gateway URL is correct in environment variables.
* Cloudflare Access should only protect the frontend domain, not the API.

---

## Author

Built as part of a serverless fullstack notes application project.
