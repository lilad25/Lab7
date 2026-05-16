# Lab7 Authentication Portal — README

## Live Demo
- **Frontend App:** https://lab7-frontend.onrender.com
- **Backend API:** https://lab7-backend-6o88.onrender.com
- **API Docs (Swagger):** https://lab7-backend-6o88.onrender.com/api-docs

## Setup Instructions

### Prerequisites
- Node.js (LTS)
- Angular CLI: `npm install -g @angular/cli`

### Local Development — Stage A (Fake Backend, no API needed)
```bash
cd Lab7-main
npm install
npm start
```
Then in `src/app/app.module.ts`, uncomment this line:
```typescript
fakeBackendProvider   // ← uncomment for Stage A
```
The fake backend simulates all API calls in the browser — no server needed.

### Local Development — Stage B (Real Backend)
```bash
# Terminal 1: Start backend
cd backend
node server.js

# Terminal 2: Start frontend
cd Lab7-main
npm start
```
Ensure `fakeBackendProvider` is commented out in `app.module.ts`.

### Production Build
```bash
ng build --configuration production
```

## Features
- ✅ Email registration with verification link
- ✅ JWT authentication (15-minute expiry)
- ✅ Refresh tokens (httpOnly cookie, auto-rotated)
- ✅ Role-based access control (Admin / User)
- ✅ Admin panel with full account management (CRUD)
- ✅ Forgot password / reset password flow
- ✅ Fake backend for offline testing (Stage A)
- ✅ SPA routing fix (`/* → /index.html`) on Render

## Security Practices
- No secrets hardcoded — all via `.env` or Render environment variables
- JWT_SECRET managed via hosting platform environment variables
- `.env` file excluded from git via `.gitignore`

## Authentication Flow (Stage B)
1. Register → verification email sent (link also in API response)
2. Click verification link → account activated in database
3. Login → JWT token (in memory) + refreshToken (httpOnly cookie)
4. JWT auto-refreshes before expiry using refresh token
5. Logout → refresh token revoked in database
6. Admin (first account) → full access to `/admin` panel
7. User (subsequent accounts) → restricted from admin panel
