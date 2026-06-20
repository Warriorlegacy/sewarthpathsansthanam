import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sewarthpathsansthanam.org"),
  title: {
    default: "Sewarth Path Sansthanam | सेवार्थ पथ संस्थानम्",
    template: "%s | Sewarth Path Sansthanam",
  },
  description: "एकोऽहं द्वितीयः नास्ति — I am One, There is No Second. A registered public charitable trust working for education, health, social welfare, and cultural preservation across India. सेवा परमो धर्म: Service is the Highest Dharma.",
  keywords: [
    "NGO India",
    "charity trust India",
    "volunteer organization India",
    "donate India",
    "education charity",
    "health charity",
    "social welfare",
    "Varanasi NGO",
    "सेवार्थ पथ संस्थानम्",
    "seva",
    "volunteer India",
    "charitable trust",
    "donation India",
    "80G tax benefit",
    "non-profit India",
    "community service India",
    "cultural preservation India",
  ],
  authors: [{ name: "Sewarth Path Sansthanam", url: "https://sewarthpathsansthanam.org" }],
  creator: "Sewarth Path Sansthanam",
  publisher: "Sewarth Path Sansthanam",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://sewarthpathsansthanam.org",
    languages: {
      "en": "https://sewarthpathsansthanam.org/en",
      "hi": "https://sewarthpathsansthanam.org/hi",
    },
    types: {
      "application/rss+xml": "https://sewarthpathsansthanam.org/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hi_IN"],
    url: "https://sewarthpathsansthanam.org",
    siteName: "Sewarth Path Sansthanam",
    title: "Sewarth Path Sansthanam | सेवार्थ पथ संस्थानम्",
    description: "एकोऽहं द्वितीयः नास्ति — I am One, There is No Second. A registered public charitable trust working for education, health, social welfare, and cultural preservation across India.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Sewarth Path Sansthanam Logo",
      },
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sewarth Path Sansthanam - Service is the Highest Dharma",
      },
    ],
    videos: [
      {
        url: "/videos/about.mp4",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewarth Path Sansthanam | सेवार्थ पथ संस्थानम्",
    description: "एकोऽहं द्वितीयः नास्ति — Service is the Highest Dharma. Join us in serving humanity across India.",
    images: ["/images/logo.png"],
    creator: "@sewarthpathsansthanam",
    site: "@sewarthpathsansthanam",
  },
  facebook: {
    appId: "facebook-app-id-here",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sewarth Path Sansthanam",
    startupImage: [
      "/icons/apple-touch-icon.png",
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#E07B39" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="alternate" type="application/rss+xml" title="Sewarth Path Sansthanam RSS Feed" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Sewarth Path Sansthanam",
              alternateName: "सेवार्थ पथ संस्थानम्",
              description: "A registered public charitable trust working for education, health, social welfare, and cultural preservation across India. सेवा परमो धर्म: Service is the Highest Dharma.",
              url: "https://sewarthpathsansthanam.org",
              logo: "https://sewarthpathsansthanam.org/images/logo.png",
              image: "https://sewarthpathsansthanam.org/images/logo.png",
              foundingDate: "2022",
              legalName: "Sewarth Path Sansthanam",
              foundingLocation: "Varanasi, Uttar Pradesh, India",
              areaServed: "India",
              serviceArea: {
                "@type": "Place",
                name: "All India (सम्पूर्ण भारत)",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "contact@sewarthpathsansthanam.org",
                telephone: "+91-9454222116",
                availableLanguage: ["English", "Hindi"],
                contactOption: "TollFree",
                areaServed: "IN",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka",
                addressLocality: "Varanasi",
                addressRegion: "Uttar Pradesh",
                postalCode: "221005",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.3176,
                longitude: 82.9739,
              },
              sameAs: [
                "https://www.facebook.com/sewarthpathsansthanam",
                "https://www.instagram.com/sewarthpathsansthanam",
                "https://twitter.com/sewarthpathsansthanam",
                "https://www.youtube.com/@sewarthpathsansthanam",
                "https://www.linkedin.com/company/sewarthpathsansthanam",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Membership Plans",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Volunteer Membership",
                      description: "Free membership for active volunteers",
                    },
                    price: "0",
                    priceCurrency: "INR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Annual Membership",
                      description: "Full benefits with annual contribution",
                    },
                    price: "365",
                    priceCurrency: "INR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Lifetime Patron",
                      description: "One-time lifetime membership",
                    },
                    price: "5001",
                    priceCurrency: "INR",
                  },
                ],
              },
             AggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}