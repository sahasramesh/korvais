// src/components/SignIn.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';

export default function SignIn({ switchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md p-8">
        <Typography level="h2" className="text-center mb-6">
          Welcome back
        </Typography>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            size="lg"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            size="lg"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && (
            <Typography color="danger" className="text-center">
              {error}
            </Typography>
          )}
          
          <Button
            type="submit"
            size="lg"
            fullWidth
            color="primary"
          >
            Sign In
          </Button>
        </form>

        <Divider sx={{ my: 4 }}>or</Divider>
        
        <Typography className="text-center">
          Don't have an account?{' '}
          <Link
            component="button"
            onClick={switchToSignUp}
            fontWeight="lg"
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
