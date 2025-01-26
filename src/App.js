// src/App.js
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import CreateKorvai from './pages/CreateKorvai';
import { ToastProvider } from './context/ToastContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div></div>;

  if (!user) return <Navigate to="/signin" />;

  return children;
};

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateKorvai />
            </ProtectedRoute>
          }
        />
      </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
