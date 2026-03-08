# Security Remediation & Backend Hardening Notes

## Implemented in this revision

- Added frontend rich-text sanitization before rendering journal article HTML.
- Added slug validation to prevent route parameter abuse.
- Added CSS token/value sanitization for chart inline styles.
- Added localStorage item-size guard to reduce poisoning/DoS risks.
- Added static-host security headers via `_headers` and CSP fallback meta tags in `index.html`.
- Added a minimal backend auth service (`server/*`) with:
  - Login
  - Refresh token
  - Logout / logout-all
  - Password hashing using `scrypt`
  - Signed access/refresh tokens
  - Rate limiting
  - Security headers + CORS allowlist

## Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/logout-all`

## Runtime

```bash
npm run auth:dev
```

Default port: `8787`

### Environment variables

- `AUTH_PORT`
- `JWT_SECRET`
- `ACCESS_TOKEN_TTL_SECONDS`
- `REFRESH_TOKEN_TTL_SECONDS`
- `ALLOWED_ORIGINS`
- `AUTH_SEED_LOGIN`
- `AUTH_SEED_PASSWORD`
