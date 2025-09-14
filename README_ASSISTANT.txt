
I added a simple Express backend under `backend/` that uses JSON files in `backend/data/` for storage.
Files added:
- backend/package.json
- backend/server.js
- backend/seed.js
- backend/data/*.json (after running seed)
- backend/README_BACKEND.md
- backend/.env.example

How to run:
1. cd backend
2. npm install
3. npm run seed
4. npm start

I did not modify your original frontend files — they remain in this ZIP. If your frontend expects specific API paths, you can update either the frontend fetch URLs or the backend routes to match.

If you want me to wire specific frontend endpoints to exact backend routes (e.g., form names, exact path names), tell me which files in the frontend call APIs and I will align them next.

The fixed project ZIP is at: /mnt/data/hackthon-project-fixed.zip
