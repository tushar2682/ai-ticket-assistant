# Backend API Reference

Base URL: `${SERVER_URL}`

## Auth

### POST /api/auth/signup
- Body: `{ email: string, password: string, skills?: string[] }`
- Response: `{ user, token }`
- Triggers `user.signup` Inngest event.

### POST /api/auth/login
- Body: `{ email: string, password: string }`
- Response: `{ user, token }`

### POST /api/auth/logout
- Headers: `Authorization: Bearer <token>`
- Response: `{ message: string }`

### GET /api/auth/user
- Headers: `Authorization: Bearer <token>`
- Role: admin
- Response: `User[] (without password)`

### POST /api/auth/update-user
- Headers: `Authorization: Bearer <token>`
- Role: admin
- Body: `{ email: string, role?: 'user'|'moderator'|'admin', skills?: string[] }`
- Response: `{ message: string }`

## Tickets

### GET /api/tickets
- Headers: `Authorization: Bearer <token>`
- Role: any
- Response:
  - admin/moderator: all tickets with `assignedTo`
  - user: own tickets with selected fields

### GET /api/tickets/:id
- Headers: `Authorization: Bearer <token>`
- Response: ticket by id (if permitted)

### POST /api/tickets
- Headers: `Authorization: Bearer <token>`
- Body: `{ title: string, description: string, priority?: string }`
- Response: created ticket

## Middleware

### authenticate(req,res,next)
- Expects `Authorization: Bearer <jwt>`
- Sets `req.user` or returns 401.

## Examples

```bash
# Signup
curl -X POST "$SERVER_URL/api/auth/signup" \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.com","password":"pass","skills":["React","Node"]}'

# Login
curl -X POST "$SERVER_URL/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.com","password":"pass"}'

# Get tickets
curl "$SERVER_URL/api/tickets" -H "Authorization: Bearer $TOKEN"

# Create ticket
curl -X POST "$SERVER_URL/api/tickets" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Bug","description":"App crashes"}'
```