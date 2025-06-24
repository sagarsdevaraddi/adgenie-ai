'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [xy, setXY] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setXY({ x: x / 20, y: -y / 20 });
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-[120px] opacity-40 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 blur-[100px] opacity-30 rounded-full animate-spin-slow" />
      </div>

      {/* 3D Card */}
      <div
        className="transition-transform duration-300"
        style={{
          transform: `perspective(800px) rotateX(${xy.y}deg) rotateY(${xy.x}deg)`,
        }}
      >
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl max-w-xl text-center p-10 border border-white/20">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            🚀 AdGenie AI
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Generate high-converting ad copy & market insights with free AI.
          </p>

          <Link href="/dashboard">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-lime-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              Enter Dashboard
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
