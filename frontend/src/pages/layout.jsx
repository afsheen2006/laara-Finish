
import { Inter, Geist_Mono, Outfit, Oxanium } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit'
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: '--font-oxanium'
});



export const viewport = {
  themeColor: '#000000'
};

import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
const auth = async () => null;import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default async function RootLayout({
  children


}) {
  const session = await auth();

  return (/*#__PURE__*/
    _jsxs("html", { lang: "en", className: `${inter.variable} ${geistMono.variable} ${outfit.variable} ${oxanium.variable} bg-background`, suppressHydrationWarning: true, children: [/*#__PURE__*/
      _jsx("head", { children: /*#__PURE__*/
        _jsx("script", {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Laara Innovations",
              "url": "https://laarainnovations.com",
              "logo": "https://laarainnovations.com/logo.png",
              "description": "Multi-disciplinary tech startup specializing in Drone Propeller R&D, Educational Technology, and Software Consultancy.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Vijayawada",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "521101",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "laarainnovations26@gmail.com"
              },
              "sameAs": [
              "https://www.linkedin.com/company/laara-innovations/",
              "https://www.instagram.com/laara_innovations"]

            })
          } }
        ) }
      ), /*#__PURE__*/
      _jsx("body", { className: "font-sans antialiased", children: /*#__PURE__*/
        _jsxs(Providers, { session: session, children: [
          children, /*#__PURE__*/
          _jsx(Toaster, { position: "top-right", richColors: true }),
          import.meta.env.NODE_ENV === 'production' && /*#__PURE__*/_jsx(Analytics, {})] }
        ) }
      )] }
    ));

}