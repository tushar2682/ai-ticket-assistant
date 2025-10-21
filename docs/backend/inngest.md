# Inngest Functions

## Client
- `InngestClient({ id: "ticketing-system" })`

## Functions

### onSignUp (user.signup)
- Event: `user.signup`
- Steps:
  - Fetch user by email from `UserActivation`
  - Send welcome email via `sendEmail`
- Output: `{ success: true } | error`

### onTicketCreated (ticket/created)
- Event: `ticket/created`
- Steps:
  - Fetch ticket by id
  - Analyze ticket with `analyzeTicket` to infer priority, notes, related skills
  - Update ticket fields accordingly
  - Find moderator by matching `skills` or fallback to admin
  - Assign ticket and notify via email
- Output: `{ success: true } | error`

## Utils

### analyzeTicket(ticket)
- Uses `@inngest/agent-kit` with Gemini model
- Returns JSON: `{ Summary, Priority, Helpful Notes, Related Skills }`

### sendEmail(to, subject, text)
- Uses `nodemailer.createTransport`
- Sends email, returns info

## Webhook Endpoint
- Served at `/api/inngest` using `inngest/express` with registered functions.