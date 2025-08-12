import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formatPKR = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const Exchange = () => {
  const title = "Crypto Exchange Demo — Dashboard";
  const description = "A simple Binance-like dashboard showing your name and PKR balance with sample markets.";
  const canonical = typeof window !== "undefined" ? window.location.href : "/";

  const [name, setName] = useState("");
  const balance = 52000;

  useEffect(() => {
    const stored = localStorage.getItem("user_name") || "";
    setName(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("user_name", name);
  }, [name]);

  const markets = useMemo(
    () => [
      { symbol: "BTC/USDT", price: 64250.32, change: 1.8 },
      { symbol: "ETH/USDT", price: 3120.5, change: -0.9 },
      { symbol: "BNB/USDT", price: 585.12, change: 0.6 },
      { symbol: "SOL/USDT", price: 172.44, change: 3.1 },
      { symbol: "XRP/USDT", price: 0.62, change: -2.4 },
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <header className="border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">Forex Guide</Link>
          <div className="flex items-center gap-3">
            <a href="#markets" className="underline hover:no-underline">Markets</a>
            <a href="#wallet" className="underline hover:no-underline">Wallet</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Crypto Exchange Dashboard</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Binance-like experience: always-on markets, low fees, P2P options and a simple wallet overview.
          </p>

          <div id="wallet" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground">Your name</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-label="Your name"
                    />
                    <Button type="button" onClick={() => { /* saved automatically */ }}>
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Saved locally on this device.</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Primary currency</div>
                  <div className="mt-2 font-medium">PKR (₨)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatPKR(balance)}</div>
                <div className="text-sm text-muted-foreground mt-1">Available • Spot</div>
                <div className="mt-4 flex gap-2">
                  <Button variant="default">Deposit</Button>
                  <Button variant="secondary">Withdraw</Button>
                  <Button variant="outline">Trade</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <section id="markets" className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Markets</h2>
              <Button variant="outline" size="sm">View all</Button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b">
                    <th className="py-3 pr-4">Pair</th>
                    <th className="py-3 pr-4">Last Price (USDT)</th>
                    <th className="py-3 pr-4">24h Change</th>
                    <th className="py-3 pr-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m) => (
                    <tr key={m.symbol} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">{m.symbol}</td>
                      <td className="py-3 pr-4">{m.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className={`py-3 pr-4 ${m.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {m.change > 0 ? "+" : ""}{m.change}%
                      </td>
                      <td className="py-3 pr-4">
                        <Button size="sm">Trade</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Prices are demo only. For PKR on-ramps in Pakistan, use P2P where available.
            </p>
          </section>
        </section>

        <footer className="py-12 border-t">
          <div className="container mx-auto px-6 text-sm text-muted-foreground">
            <p>Demo app. No real trading. {name ? `${name}, ` : ""}your balance is {formatPKR(balance)}.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Exchange;
