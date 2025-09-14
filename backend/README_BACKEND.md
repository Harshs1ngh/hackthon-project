
# Backend for your project (added by assistant)

This backend is a lightweight Express server that stores data in JSON files under `backend/data/`.
It's intended to be easy to run without setting up a database.

## Quick start

1. Open a terminal
2. cd backend
3. npm install
4. npm run seed   # creates sample data
5. npm run start  # or npm run dev (if you want nodemon)

## Endpoints

- GET  /api/packages
- GET  /api/packages/:id
- GET  /api/testimonials
- GET  /api/agents
- POST /api/contact
- POST /api/auth/register
- POST /api/auth/login

Note: This is a development stub. For production, replace JSON files with a real database and add secure password hashing (bcrypt) and JWT authentication.
