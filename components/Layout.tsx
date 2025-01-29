import Head from "next/head"
import { useRouter } from "next/router"
import type React from "react" // Added import for React

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = "Twitter Analytics Dashboard",
  description = "Analyze and manage your Twitter presence with our advanced dashboard.",
}: LayoutProps) {
  const router = useRouter()
  const canonicalUrl = `https://your-domain.com${router.asPath}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Twitter Analytics Dashboard",
    description: description,
    url: canonicalUrl,
    applicationCategory: "Analytics",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://your-domain.com/twitter-image.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </>
  )
}

