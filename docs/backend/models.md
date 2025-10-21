# Backend Models

## User (`ai-ticket assistant/models/user.js`)
- `email: string` (required, unique)
- `password: string` (required)
- `role: 'user'|'moderator'|'admin'` (default: `user`)
- `skills: string[]`
- `createdAt: Date` (default now)

## Ticket (`ai-ticket assistant/models/ticket.js`)
- `title: string`
- `description: string`
- `status: string` (default: `TODO`)
- `createdBy: ObjectId<User>`
- `assignedTO: ObjectId<User> | null`
- `priority: string`
- `Deadline: Date`
- `helpfulNotes: string`
- `createdAt: Date` (default now)

Notes:
- Admin/moderator can see all tickets; users see only their own.
- Inngest functions may update `priority`, `helpfulNotes`, and assignment.