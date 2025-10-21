# Frontend Components & Pages

Base API URL used: `import.meta.env.VITE_SERVER_URL`

## Components

### Auth
- Props: `children: ReactNode`, `protectedRoute: boolean`
- Redirects based on presence of token in `localStorage`.

### CheckAuth
- Placeholder component.

## Pages

### Login
- POST `${VITE_SERVER_URL}/auth/login`
- Stores `token` and `user` in `localStorage` and navigates to `/`.

### Signup
- POST `${VITE_SERVER_URL}/auth/signup`
- Stores `token` and `user` in `localStorage` and navigates to `/`.

### Tickets
- GET `${VITE_SERVER_URL}/tickets`
- Requires `Authorization: Bearer <token>`
- Displays list of tickets.

### Ticket (Create)
- POST `${VITE_SERVER_URL}/tickets/create`
- Requires `Authorization: Bearer <token>`
- Creates a new ticket then navigates to `/tickets`.

### Admin
- POST `${VITE_SERVER_URL}/auth/admin`
- On success, stores auth data and navigates to `/`.

## Usage Examples

```jsx
// Protect a page
<Auth protectedRoute>
  <Tickets />
</Auth>
```

```js
// Read token for API calls
const token = localStorage.getItem('token');
fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
  headers: { Authorization: `Bearer ${token}` }
});
```