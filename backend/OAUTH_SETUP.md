OAuth setup (Google & Microsoft) — quick start

Overview

This file explains how to create OAuth credentials in Google Cloud and Azure, how to populate the backend `.env`, and how to test sign-in locally. The backend currently expects provider callbacks at fixed endpoints and passes the frontend redirect via the `state` parameter.

1) Set values in `backend/.env`
- Copy `backend/.env.example` -> `backend/.env` and fill the placeholder values.
- Keep `.env` out of source control.

Required keys:
- `BACKEND_URL` — e.g. `http://localhost:8000`
- `FRONTEND_URL` — e.g. `http://localhost:5174`
- `JWT_SECRET` — long random string
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`

2) Google OAuth credentials
- Go to https://console.cloud.google.com/apis/credentials
- Create or select a project.
- Credentials → Create Credentials → OAuth client ID → Web application
  - Authorized JavaScript origins: (optional) `http://localhost:5174`
  - Authorized redirect URIs: **add** `http://localhost:8000/auth/google/callback`
- Save the Client ID / Client Secret into `backend/.env`.

3) Microsoft (Azure) app registration
- Go to Azure Portal → Azure Active Directory → App registrations → New registration
- Name: e.g. `student-dropout-system-dev`
- Supported account types: choose as needed (Accounts in any org and personal Microsoft accounts is convenient)
- Redirect URI (type Web): **add** `http://localhost:8000/auth/microsoft/callback`
- After creation: Certificates & secrets → New client secret → copy value
- Copy `Application (client) ID` and client secret into `backend/.env` fields

4) Restart the backend
- From the `backend` folder:
```powershell
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

5) Frontend environment (Vite)
- Vite reads env vars prefixed with `VITE_`.
- Create a `frontend/.env` (do not commit keys if present) with:
```
VITE_BACKEND_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5174
```
- Restart the Vite dev server:
```powershell
cd frontend
npm run dev
```

6) Test sign-in
- Open the frontend login page and click "Sign in with Google" (or Microsoft).
- The browser will redirect to the provider's consent page, then back to the backend callback.
- The backend constructs the provider `redirect_uri` as `http://localhost:8000/auth/<provider>/callback` and reads the `state` parameter which is the frontend redirect (default `http://localhost:5174/auth/success`).
- After callback the backend issues a JWT and redirects the browser to the frontend `auth/success?token=...`.

Security notes & next steps
- Returning a JWT in the query string is convenient for local dev but not secure in production. Recommended next steps:
  - Switch to setting an HttpOnly, Secure cookie in the callback and redirect without token.
  - Use short-lived access tokens and refresh tokens.
  - Use proper secret storage (Key Vault, Secret Manager) in production.

Troubleshooting
- If the provider returns a redirect mismatch, double-check the registered redirect URI (must exactly match `http://localhost:8000/auth/<provider>/callback`).
- If the login endpoint returns 500, verify `.env` has the `GOOGLE_CLIENT_ID`/`MICROSOFT_CLIENT_ID` values and that `app.main` restarted after you added `.env`.
- Check backend logs (Uvicorn) for HTTPException details.

If you'd like, I can:
- Change the callback to set an HttpOnly cookie and update frontend `AuthSuccess.jsx` to fetch `/auth/me` with credentials (more secure).
- Add nicer HTML error pages for missing config instead of raw JSON.
