import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

import SessionWrapper from '@/components/SessionWrapper'; // ✅ client wrapper
import AuthButtons from '@/components/AuthButtons';        // ✅ client component

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AdGenie AI',
  description: 'Generate high-converting ads with free AI',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions); // fetch session on server

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper session={session}>
          <header className="w-full p-4 flex justify-end bg-black text-white border-b border-gray-700">
            <AuthButtons />
          </header>

          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
