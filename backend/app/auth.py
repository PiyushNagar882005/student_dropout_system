from fastapi import APIRouter, Request, HTTPException, Header
from fastapi.responses import RedirectResponse, JSONResponse
import os
import httpx
import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Optional
from urllib.parse import quote_plus, unquote_plus

router = APIRouter()

# Config via environment variables
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
MICROSOFT_CLIENT_ID = os.getenv('MICROSOFT_CLIENT_ID')
MICROSOFT_CLIENT_SECRET = os.getenv('MICROSOFT_CLIENT_SECRET')
JWT_SECRET = os.getenv('JWT_SECRET', 'change-me-in-prod')
BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:8000')
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5174')

# For demo purposes we use HS256 JWTs. In production use secure key storage and rotation.
JWT_ALGORITHM = 'HS256'
JWT_EXPIRES_MINUTES = 60 * 24 * 7  # 7 days

class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


def _create_jwt(payload: dict) -> str:
    to_encode = payload.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRES_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


def _create_jwt_with_exp(payload: dict, minutes: int) -> str:
    to_encode = payload.copy()
    expire = datetime.utcnow() + timedelta(minutes=minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


def _verify_jwt(token: str) -> dict:
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return data
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='Invalid token')


@router.get('/auth/google/login')
def google_login(redirect: str = None):
    # Use `state` to transport the frontend redirect target; keep provider redirect_uri fixed.
    frontend_redirect = redirect or f"{FRONTEND_URL}/auth/success"
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail='Google client id not configured')

    params = {
        'client_id': GOOGLE_CLIENT_ID,
        'response_type': 'code',
        'scope': 'openid email profile',
        'redirect_uri': f"{BACKEND_URL}/auth/google/callback",
        'state': quote_plus(frontend_redirect),
        'access_type': 'offline',
        'prompt': 'select_account'
    }
    url = 'https://accounts.google.com/o/oauth2/v2/auth'
    req = httpx.URL(url).include_query_params(**params)
    return RedirectResponse(str(req))


@router.get('/auth/google/callback')
async def google_callback(request: Request, code: str = None, state: str = None, redirect: str = None):
    if not code:
        raise HTTPException(status_code=400, detail='Missing code')
    if not GOOGLE_CLIENT_SECRET or not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail='Google credentials not configured')

    token_url = 'https://oauth2.googleapis.com/token'
    data = {
        'code': code,
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': f"{BACKEND_URL}/auth/google/callback",
        'grant_type': 'authorization_code'
    }

    async with httpx.AsyncClient() as client:
        token_resp = await client.post(token_url, data=data)
        if token_resp.status_code != 200:
            # include response body to aid debugging in dev
            raise HTTPException(status_code=400, detail=f'Token exchange failed: {token_resp.text}')
        token_json = token_resp.json()
        access_token = token_json.get('access_token')

        # fetch userinfo
        userinfo_resp = await client.get('https://openidconnect.googleapis.com/v1/userinfo', headers={'Authorization': f'Bearer {access_token}'})
        if userinfo_resp.status_code != 200:
            raise HTTPException(status_code=400, detail='Failed to fetch user info')
        userinfo = userinfo_resp.json()

    # Create our JWT with selected public claims
    payload = {
        'sub': userinfo.get('sub'),
        'email': userinfo.get('email'),
        'name': userinfo.get('name'),
        'picture': userinfo.get('picture'),
        'provider': 'google'
    }
    token = _create_jwt(payload)

    # Redirect back to frontend with token in query (you may want to use cookies instead)
    # Prefer state (frontend redirect) if provided
    try:
        redirect_to = unquote_plus(state) if state else (redirect or f"{FRONTEND_URL}/auth/success")
    except Exception:
        redirect_to = redirect or f"{FRONTEND_URL}/auth/success"
    separator = '&' if '?' in redirect_to else '?'
    return RedirectResponse(f"{redirect_to}{separator}token={token}")


@router.get('/auth/microsoft/login')
def microsoft_login(redirect: str = None):
    # Use state to carry frontend redirect; keep provider redirect_uri stable
    frontend_redirect = redirect or f"{FRONTEND_URL}/auth/success"
    if not MICROSOFT_CLIENT_ID:
        raise HTTPException(status_code=500, detail='Microsoft client id not configured')

    params = {
        'client_id': MICROSOFT_CLIENT_ID,
        'response_type': 'code',
        'scope': 'openid email profile offline_access User.Read',
        'redirect_uri': f"{BACKEND_URL}/auth/microsoft/callback",
        'state': quote_plus(frontend_redirect),
    }
    url = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    req = httpx.URL(url).include_query_params(**params)
    return RedirectResponse(str(req))


@router.get('/auth/microsoft/callback')
async def microsoft_callback(request: Request, code: str = None, state: str = None, redirect: str = None):
    if not code:
        raise HTTPException(status_code=400, detail='Missing code')
    if not MICROSOFT_CLIENT_ID or not MICROSOFT_CLIENT_SECRET:
        raise HTTPException(status_code=500, detail='Microsoft credentials not configured')

    token_url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
    data = {
        'client_id': MICROSOFT_CLIENT_ID,
        'client_secret': MICROSOFT_CLIENT_SECRET,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': f"{BACKEND_URL}/auth/microsoft/callback",
    }

    async with httpx.AsyncClient() as client:
        token_resp = await client.post(token_url, data=data, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        if token_resp.status_code != 200:
            raise HTTPException(status_code=400, detail=f'Token exchange failed: {token_resp.text}')
        token_json = token_resp.json()
        access_token = token_json.get('access_token')

        # Microsoft userinfo
        userinfo_resp = await client.get('https://graph.microsoft.com/oidc/userinfo', headers={'Authorization': f'Bearer {access_token}'})
        if userinfo_resp.status_code != 200:
            # fallback to Graph v1.0 me endpoint
            userinfo_resp = await client.get('https://graph.microsoft.com/v1.0/me', headers={'Authorization': f'Bearer {access_token}'})
        if userinfo_resp.status_code != 200:
            raise HTTPException(status_code=400, detail='Failed to fetch user info')
        userinfo = userinfo_resp.json()

    payload = {
        'sub': userinfo.get('id') or userinfo.get('sub'),
        'email': userinfo.get('mail') or userinfo.get('userPrincipalName'),
        'name': userinfo.get('displayName') or userinfo.get('name'),
        'provider': 'microsoft'
    }
    token = _create_jwt(payload)

    try:
        redirect_to = unquote_plus(state) if state else (redirect or f"{FRONTEND_URL}/auth/success")
    except Exception:
        redirect_to = redirect or f"{FRONTEND_URL}/auth/success"
    separator = '&' if '?' in redirect_to else '?'
    return RedirectResponse(f"{redirect_to}{separator}token={token}")


@router.post('/auth/forgot-password')
async def forgot_password(body: ForgotPasswordRequest):
    if not body.email:
        raise HTTPException(status_code=400, detail='Email is required')

    # Create a short lived reset token (1 hour)
    reset_token = _create_jwt_with_exp({'email': body.email, 'action': 'reset'}, minutes=60)

    # In a real app you would email the reset link. For dev we'll return it.
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"

    return JSONResponse(content={'message': 'Password reset link generated', 'reset_link': reset_link})


@router.post('/auth/reset-password')
async def reset_password(body: ResetPasswordRequest):
    if not body.token or not body.new_password:
        raise HTTPException(status_code=400, detail='Token and new_password are required')

    try:
        payload = _verify_jwt(body.token)
    except HTTPException:
        raise HTTPException(status_code=400, detail='Invalid or expired token')

    if payload.get('action') != 'reset' or not payload.get('email'):
        raise HTTPException(status_code=400, detail='Invalid token payload')

    # Here we'd update the user's password in the DB. This project uses demo users, so we'll just acknowledge.
    return JSONResponse(content={'message': 'Password has been reset (simulated) for ' + payload.get('email')})


@router.get('/auth/me')
def auth_me(authorization: str = Header(None)):
    # Accept `Authorization: Bearer <token>` header
    if not authorization:
        raise HTTPException(status_code=401, detail='Missing authorization')
    # header is typically 'Bearer <token>'
    try:
        parts = authorization.split()
        if len(parts) == 2 and parts[0].lower() == 'bearer':
            token = parts[1]
        else:
            # maybe the token was passed directly
            token = authorization
    except Exception:
        raise HTTPException(status_code=401, detail='Malformed authorization header')

    data = _verify_jwt(token)
    return JSONResponse(content={'user': data})
