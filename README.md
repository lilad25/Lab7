# Lab7 Frontend - Laboratory Management & Activity Tracking

This is the frontend component of the Lab7 full-stack authentication boilerplate, built with Angular 21.

## Live Links
* **Frontend Application:** https://lab7-frontend.onrender.com
* **Backend API (Swagger):** https://lab7-backend-6o88-ymfb.onrender.com/api-docs
* **Backend Repository:** https://github.com/lilad25/lab7-backend

## Setup Instructions
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to run the development server at `http://localhost:4200`
4. The application is configured to use the live remote backend API for production testing.

## Render Deployment Note
When deploying to Render as a Static Site, the following Rewrite Rule was configured to prevent 404 errors on deep links:
* **Source:** `/*`
* **Destination:** `/index.html`
* **Action:** Rewrite
