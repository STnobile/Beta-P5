# Split Frontend and Backend (GitHub + VS Code)

## 1. Create two GitHub repositories

- `project-frontend` for this React app
- `project-backend` for `def-api-rec` (Django API)

## 2. Frontend repository contents

Keep only frontend files:

- `public/`
- `src/`
- `package.json`
- `package-lock.json`
- frontend config/docs

Use `.env.example`:

```bash
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

## 3. Backend repository contents

Use `def-api-rec` as the backend root.

Use `.env.example`:

```bash
DEV=1
SECRET_KEY=devkey
ALLOWED_HOST=127.0.0.1
CLIENT_ORIGIN=http://localhost:3000
```

Optional for multiple frontend URLs in production:

```bash
CLIENT_ORIGINS=https://your-frontend.vercel.app,https://www.yourdomain.com
```

## 4. Local development

Run backend:

```bash
cd def-api-rec
DEV=1 SECRET_KEY=devkey .venv/bin/python manage.py migrate
DEV=1 SECRET_KEY=devkey .venv/bin/python manage.py runserver 127.0.0.1:8000
```

Run frontend:

```bash
npm start
```

## 5. VS Code quick start

From this workspace, run task:

- `Full stack: start`

This starts backend and frontend in parallel.

## 6. Deploy order

1. Deploy backend and confirm API URL.
2. Set frontend `REACT_APP_API_BASE_URL` to backend URL.
3. Set backend `CLIENT_ORIGIN` (or `CLIENT_ORIGINS`) to frontend URL(s).
4. Redeploy backend.
