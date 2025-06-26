'use client';

import { signIn } from 'next-auth/react';

const handleGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
  signIn('google', { callbackUrl: '/login' });
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Welcome to AdGenie AI</h1>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
