import "./globals.css";
import { site } from "@/config/site";

const siteUrl = site.url;
const description = "Somnath Yadav is a frontend and Next.js full-stack developer in India building fast product interfaces, APIs, PostgreSQL and Prisma systems, and payment workflows.";
const socialImage = "/opengraph-image.png";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Somnath Yadav | Frontend & Next.js Full-stack Developer",
    template: "%s | Somnath Yadav",
  },
  description,
  applicationName: "Somnath Yadav Portfolio",
  authors: [{ name: "Somnath Yadav", url: siteUrl }],
  creator: "Somnath Yadav",
  publisher: "Somnath Yadav",
  category: "technology",
  keywords: [
    "Somnath Yadav",
    "Somnath Yadav frontend developer",
    "frontend developer India",
    "Next.js full-stack developer",
    "React developer",
    "Next.js developer",
    "PostgreSQL Prisma developer",
    "Stripe Razorpay integration",
    "frontend engineer Rajkot",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Somnath Yadav Portfolio",
    title: "Somnath Yadav | Frontend & Next.js Full-stack Developer",
    description,
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Somnath Yadav — frontend and Next.js full-stack developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somnath Yadav | Frontend & Next.js Full-stack Developer",
    description,
    images: [socialImage],
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Somnath Yadav",
      url: siteUrl,
      image: `${siteUrl}${socialImage}`,
      jobTitle: "Frontend & Next.js Full-stack Developer",
      description,
      email: "mailto:somnathyadav2000@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Rajkot", addressRegion: "Gujarat", addressCountry: "IN" },
      knowsAbout: ["React", "Next.js", "JavaScript", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Razorpay", "API design", "Frontend performance", "Product interface design"],
      sameAs: ["https://github.com/somnathayadav72"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Somnath Yadav Portfolio",
      description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Somnath Yadav — Frontend Developer Portfolio",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
