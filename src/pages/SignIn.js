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
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignIn({ switchToSignUp }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/feed');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md p-8">
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
            fullWidth
            size="lg"
            variant="soft"
            color="neutral"
            startDecorator={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>

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
            onClick={() => navigate('/signup')}
            fontWeight="lg"
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
