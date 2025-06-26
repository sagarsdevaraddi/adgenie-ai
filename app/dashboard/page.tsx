'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Ad {
  id: string;
  product: string;
  headline: string;
  caption: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchAds();
    }
  }, [status]);

  async function fetchAds() {
    try {
      const res = await fetch('/api/my-ads');
      const data = await res.json();
      setAds(data);
    } catch (error) {
      console.error('Failed to fetch ads:', error);
    } finally {
      setLoading(false);
    }
  }

  if (status === 'loading' || loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Ads</h1>
      {ads.length === 0 ? (
        <p>No ads created yet.</p>
      ) : (
        <ul className="space-y-4">
          {ads.map((ad) => (
            <li key={ad.id} className="p-4 border rounded shadow bg-lightblue">
              <h2 className="text-xl font-semibold">{ad.headline}</h2>
              <p className="text-blue-700">{ad.caption}</p>
              <p className="text-sm text-green-500 mt-2">
                Product: {ad.product} • Created At:{' '}
                {new Date(ad.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
