'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span>Welcome, {session.user?.name?.split(' ')[0]}</span>
        <button
          onClick={async () => {
            await signOut({ callbackUrl: '/' });
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
            await signIn('google',{ callbackUrl: '/login' });
          }}// 👈 This triggers Google login
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      Login with Google
    </button>
  );
}
