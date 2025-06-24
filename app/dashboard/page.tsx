"use client";
import { useState } from "react";

export default function Dashboard() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState("");

  return (
    <main className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Ad Copy Generator</h2>

      <div className="mb-4">
        <label className="block font-medium">Product/Service:</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. Yoga classes for busy moms"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Target Audience:</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="e.g. Women age 25–40"
        />
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() =>
          setResult("✨ Ad Copy: Get fit with yoga — made for moms like you!")
        }
      >
        Generate Ad Copy
      </button>

      {result && (
  <div className="mt-6 bg-gray-100 p-4 rounded shadow text-gray-800">
    <h4 className="font-bold mb-2 text-black">Result:</h4>
    <p>{result}</p>
  </div>
)}

    </main>
  );
}
