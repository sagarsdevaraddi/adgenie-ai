'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [productName, setProductName] = useState<string>('');
  const [adResult, setAdResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setXY({ x: x / 20, y: -y / 20 });
  }


   // Handle form + API call
   async function handleGenerate(){
    try{

    
    if(!productName.trim()) return;

    setLoading(true);
    const res = await fetch('/api/generate',{
      method:'POST',headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName })
    })

    
    if (!res.ok) {
      const errorText = await res.text(); // Read raw error response
      console.error('API Error:', errorText);
      alert('AI generation failed. Please try again later.');
      setLoading(false);
      return;
    }

    const data = await res.json()
    console.log('✅ Generated:', data);
         console.log(data.headline);
         console.log(data.caption)
     setAdResult(data.result);
     setLoading(false);
   }catch(error){
    console.error('❌ Error calling API:', error);
  }
  }
  
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Glowing Background Lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-[120px] opacity-40 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 blur-[100px] opacity-30 rounded-full animate-spin-slow" />
      </div>

      {/* 3D Card */}
      <div
        className="transition-transform duration-300 w-full px-4"
        style={{
          transform: `perspective(800px) rotateX(${xy.y}deg) rotateY(${xy.x}deg)`,
        }}
      >
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl max-w-xl mx-auto text-center p-10 border border-white/20">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            🚀 AdGenie AI
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Generate high-converting ad copy & market insights with free AI.
          </p>

          {/* Input + Generate Button */}
          <div className="flex flex-col items-center gap-4">
            <input
              className="w-full px-4 py-2 rounded text-green-600 focus:outline-none"
              placeholder="Enter your product or brand name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-green-400 to-lime-400 text-black font-semibold px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Ad'}
            </button>
          </div>

          {/* Result Box */}
          {adResult && (
            <div className="mt-6 text-left bg-black/40 p-4 rounded-lg text-white">
                <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                Generated Ad
                </h2>
              <p><strong>Headline:</strong> {adResult.headline}</p>
              <p><strong>Caption:</strong> {adResult.caption}</p>
            </div>
          )}

          {/* Dashboard Link */}
          <div className="mt-6">
            <Link href="/dashboard">
              <span className="inline-block mt-4 text-sm text-blue-300 underline hover:text-white transition">
                Go to Dashboard →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

