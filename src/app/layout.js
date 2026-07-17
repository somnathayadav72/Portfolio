import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Somnath Yadav — Frontend Developer",
    template: "%s | Somnath Yadav",
  },
    description: "Frontend Developer with Next.js full-stack capability, building SaaS, B2B, ERP, consumer products, APIs, data systems, and payment flows.",
  openGraph: {
    title: "Somnath Yadav — Frontend Developer",
    description: "Selected product work, independent products, full-stack Next.js capability, and frontend design experiments.",
    images: [{ url: "/brand/social-avatar.svg", width: 1200, height: 630, alt: "Somnath Yadav frontend portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somnath Yadav — Frontend Developer",
    description: "React, Next.js full-stack product engineering, PostgreSQL, Prisma, payments, performance, and interaction design.",
    images: ["/brand/social-avatar.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
