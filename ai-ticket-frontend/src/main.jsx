import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Auth from './component/auth.jsx';
import Tickets from './pages/tickets.jsx';
import Admin from './pages/admin.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth protected={true}>
              <Tickets />
            </Auth>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <Auth protected={true}>
              <Tickets detailspage />
            </Auth>
          }
        />
        <Route
          path="/login"
          element={
            <Auth protected={false}>
              <Login />
            </Auth>
          }
        />
        <Route
          path="/signup"
          element={
            <Auth protected={false}>
              <Signup />
            </Auth>
          }
        />
        <Route
          path="/admin"
          element={
            <Auth protected={true}>
              <Admin />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
