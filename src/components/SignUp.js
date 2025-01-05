// src/components/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';

export default function SignUp({ switchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md p-8">
        <Typography level="h2" className="text-center mb-6">
          Create an account
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
          <Input
            size="lg"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </Button>
        </form>

        <Divider sx={{ my: 4 }}>or</Divider>
        
        <Typography className="text-center">
          Already have an account?{' '}
          <Link
            component="button"
            onClick={switchToSignIn}
            fontWeight="lg"
          >
            Sign in
          </Link>
        </Typography>
      </Card>
    </div>
  );
}