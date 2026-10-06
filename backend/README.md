# LearnSphere Backend

Run:

```powershell
npm install
copy .env.example .env
npm start
```

Test:

`http://localhost:5000/api/health`

Authentication:
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/student/dashboard`

Passwords are hashed with bcrypt and login returns a JWT.
