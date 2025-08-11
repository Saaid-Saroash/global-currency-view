import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-forex.jpg";
import { ArrowRight, Globe2, Clock, Building2, Gauge, Target } from "lucide-react";

const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <section className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary-foreground">
                Forex (Foreign Exchange Market) — Simple Guide
              </h1>
              <p className="mt-4 text-base md:text-lg text-primary-foreground/90 max-w-prose">
                The world’s largest market where currencies are exchanged. Learn how pairs work, what moves prices, and where the opportunities and risks are.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="hero" size="xl">
                  <a href="#basics" className="inline-flex items-center">Learn the basics <ArrowRight className="ml-2" /></a>
                </Button>
                <Button asChild variant="soft" size="xl">
                  <a href="#compare">Compare markets</a>
                </Button>
              </div>
            </div>
            <figure className="group relative">
              <img
                src={heroImage}
                alt="Abstract world map with currency symbols and candlestick chart representing the Forex market"
                className="w-full rounded-xl shadow-glow ring-1 ring-transparent transition-transform duration-300 ease-out group-hover:-translate-y-1"
                loading="eager"
              />
            </figure>
          </div>
        </div>
      </section>
    </header>
  );
};

export const KeyFacts = () => {
  const items = [
    { icon: Globe2, title: "Size", desc: "~$6T traded daily — the biggest market in the world." },
    { icon: Clock, title: "Hours", desc: "Open 24 hours a day, 5 days a week." },
    { icon: Building2, title: "Players", desc: "Banks, governments, companies, and individual traders." },
    { icon: Gauge, title: "Leverage", desc: "Small capital controls larger positions (e.g., 1:100)." },
    { icon: Target, title: "Goal", desc: "Buy rising currencies, sell falling ones — trade pairs." },
  ];
  return (
    <section id="facts" className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Key facts</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="rounded-xl border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProsCons = () => {
  const pros = [
    "Open almost all week",
    "Low starting amount",
    "Profit in rising and falling markets",
  ];
  const cons = [
    "Leverage can amplify losses",
    "News can cause sudden swings",
    "Unregulated brokers can scam beginners",
  ];
  return (
    <section id="basics" className="py-16 md:py-20 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Why it’s attractive</h2>
            <ul className="mt-6 space-y-3">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Why it’s risky</h2>
            <ul className="mt-6 space-y-3">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ComparisonTable = () => {
  const rows = [
    { label: "Market hours", forex: "24/5", crypto: "24/7", stocks: "Market sessions" },
    { label: "Regulation", forex: "Highly regulated, varies by country", crypto: "Mixed / evolving", stocks: "Strong regulation" },
    { label: "Volatility", forex: "Moderate", crypto: "High", stocks: "Varies by sector" },
    { label: "Instruments", forex: "Currency pairs", crypto: "Coins & tokens", stocks: "Company shares" },
    { label: "Costs", forex: "Spreads + swaps", crypto: "Exchange fees", stocks: "Commission + spreads" },
  ];
  return (
    <section id="compare" className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Forex vs Crypto vs Stocks</h2>
        <div className="mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left">
            <thead className="bg-secondary/60">
              <tr>
                <th className="px-4 py-3">Factor</th>
                <th className="px-4 py-3">Forex</th>
                <th className="px-4 py-3">Crypto</th>
                <th className="px-4 py-3">Stocks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="even:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.forex}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.crypto}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.stocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-prose">
          You always trade currencies in pairs (e.g., EUR/USD). Buying EUR/USD means buying euros while selling U.S. dollars at the same time.
        </p>
      </div>
    </section>
  );
};

export default Hero;
