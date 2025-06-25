# 🚀 AdGenie AI – Phase 1

AdGenie AI is a free SaaS project that helps marketers and businesses generate AI-powered ad content and conduct market research from internet data. This is **Phase 1** of the project, which features a futuristic 3D interactive landing page built with modern frontend technologies.

---

## 📸 Preview

> ![Homepage Preview](./public/preview.png)  
> _A futuristic 3D landing page powered by Tailwind CSS + Next.js_

---

## 🛠️ Built With

| Tech         | Description                                |
|--------------|--------------------------------------------|
| **Next.js 14** | React framework with App Router for routing |
| **Tailwind CSS** | Utility-first modern CSS styling         |
| **TypeScript** | Type-safe and scalable frontend & backend |
| **OpenRouter.ai** | Free AI API proxy for OpenAI/Claude-like models |
| **Git & GitHub** | Source control + versioning             |

---

## ✨ Features

- 🎯 3D animated landing page with real-time mouse tilt effects  
- 🎨 Responsive, glassmorphism-based modern UI  
- 🧑‍💻 Built with App Router and TypeScript for scalability  
- 🔗 Link to `/dashboard` (Phase 2 ready)  
- 📁 Clean folder structure for enterprise-level growth

---

## 🧠 AI API Integration

This project uses the **OpenRouter.ai API** to generate ad content for a given product or brand.

### 🔍 How it works:
1. When a user submits a product name, it is sent to the backend API (`/api/generate`)
2. The backend calls OpenRouter's `/v1/chat/completions` endpoint
3. A custom prompt is passed to generate:
   - **Headline**: Attention-grabbing ad title  
   - **Caption**: Short description/CTA  
4. The AI response is extracted and shown in the UI

### ✅ Free AI Model Used:
- **Model:** `mistralai/mixtral-8x7b-instruct` (fast & free)
- **API:** `https://openrouter.ai/api/v1/chat/completions`

### 📦 Sample Prompt Sent:
```txt
Generate an ad in this format:
Headline: <your catchy title>
Caption: <short 1-line copy>

Product: GlowSkin Serum


---

## 📁 Folder Structure

```text
adgenie-ai/
├── app/
│   ├── page.tsx              # Landing page (3D UI + input form)
│   ├── dashboard/            # (Phase 2: Ad history view)
│   └── layout.tsx            # Global layout component
├── app/api/generate/
│   └── route.ts              # API route using OpenRouter AI
├── styles/
│   └── globals.css           # Global CSS (Tailwind base)
├── public/
│   └── preview.png           # Homepage preview image
├── .env.local                # API key env vars
├── tailwind.config.ts        # Tailwind customization
├── tsconfig.json             # TypeScript settings
└── README.md
```

---

## 🚦 Getting Started

```bash
git clone https://github.com/sagarsdevaraddi/adgenie-ai.git
cd adgenie-ai
```

---

## 🔮 Upcoming Features

| Feature                       | Tool/Service                                                         | Price |
| ----------------------------- | -------------------------------------------------------------------- | ----- |
| 🔐 Login (Google Auth)        | [NextAuth.js](https://next-auth.js.org/) + Google OAuth              | Free  |
| 💾 Database                   | [MongoDB Atlas (Free Tier)](https://www.mongodb.com/cloud/atlas)     | Free  |
| 🔧 ORM for DB                 | [Prisma](https://www.prisma.io/)                                     | Free  |
| 🧾 Export ads to text/PDF/CSV | Native browser features + [jsPDF](https://github.com/parallax/jsPDF) | Free  |
| 💻 Hosting & CI/CD            | [Vercel (Free Tier)](https://vercel.com)                             | Free  |
| 🧠 AI Backend                 | [OpenRouter.ai (Free API)](https://openrouter.ai)                    | Free  |
