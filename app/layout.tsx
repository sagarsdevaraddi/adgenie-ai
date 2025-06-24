import "../styles/globals.css";

export const metadata = {
  title: "AdGenie AI",
  description: "Generate AI-powered ad copy for your brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
