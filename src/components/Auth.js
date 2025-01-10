// src/components/Auth.js
import React, { useState } from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return isSignIn ? (
    <SignIn switchToSignUp={() => setIsSignIn(false)} />
  ) : (
    <SignUp switchToSignIn={() => setIsSignIn(true)} />
  );
}
