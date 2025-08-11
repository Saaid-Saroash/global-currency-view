import { Helmet } from "react-helmet-async";
import Hero, { KeyFacts, ProsCons, ComparisonTable } from "@/components/landing/Hero";

const Index = () => {
  const title = "Forex (Foreign Exchange Market) — Simple Guide";
  const description = "Learn Forex basics: how currency pairs work, who trades, key risks, and why it’s the world’s largest 24/5 market.";
  const canonical = typeof window !== "undefined" ? window.location.href : "/";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Forex?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The foreign exchange (Forex) market is where currencies are traded in pairs like EUR/USD."
        }
      },
      {
        "@type": "Question",
        name: "When is the Forex market open?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Forex runs 24 hours a day, five days a week across major financial centers."
        }
      },
      {
        "@type": "Question",
        name: "Why is Forex risky?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leverage magnifies gains and losses; news events can cause sharp moves; unregulated brokers can be scams."
        }
      }
    ]
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: "Forex Guide"
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <main>
        <Hero />
        <KeyFacts />
        <ProsCons />
        <ComparisonTable />
        <footer className="py-12 border-t">
          <div className="container mx-auto px-6 text-sm text-muted-foreground">
            <p>Educational content only. Trading involves risk.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
