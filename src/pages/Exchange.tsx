import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import ChartTabs from "@/components/exchange/ChartTabs";

const formatPKR = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const formatCurrency = (value: number, currency: "PKR" | "USD" | "EUR") =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const RATES: Record<"PKR" | "USD" | "EUR", number> = {
  PKR: 1, // base
  USD: 1 / 300, // approx demo rate
  EUR: 1 / 325, // approx demo rate
};

const Exchange = () => {
  const title = "Crypto Exchange Demo — Dashboard";
  const description = "A simple Binance-like dashboard showing your name and PKR balance with sample markets.";
  const canonical = typeof window !== "undefined" ? window.location.href : "/";

  const [name, setName] = useState("");
  const [currency, setCurrency] = useState<"PKR" | "USD" | "EUR">("PKR");
  const balancePKR = 52000;

  useEffect(() => {
    const stored = localStorage.getItem("user_name") || "";
    setName(stored);
    const storedCurrency = (localStorage.getItem("user_currency") as "PKR" | "USD" | "EUR") || "PKR";
    setCurrency(storedCurrency);
  }, []);

  useEffect(() => {
    localStorage.setItem("user_name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("user_currency", currency);
  }, [currency]);

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

  const convertedBalance = balancePKR * (RATES[currency] ?? 1);

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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Wallet Balance</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Currency</span>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
                    <SelectTrigger className="h-8 w-[130px]" aria-label="Select currency">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PKR">PKR (₨)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(convertedBalance, currency)}</div>
                <div className="text-sm text-muted-foreground mt-1">Available • Spot</div>
                <div className="mt-4 flex gap-2">
                  <Button variant="default">Deposit</Button>
                  <Button variant="secondary">Withdraw</Button>
                  <Button variant="outline">Trade</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <section id="trading" className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Trading</h2>
              <Button variant="outline" size="sm">New order</Button>
            </div>
            <div className="mt-4">
              <Tabs defaultValue="spot" className="w-full">
                <TabsList>
                  <TabsTrigger value="spot">Spot</TabsTrigger>
                  <TabsTrigger value="futures">Futures</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                  <TabsTrigger value="margin">Margin</TabsTrigger>
                </TabsList>
                <TabsContent value="spot">
                  <ChartTabs />
                </TabsContent>
                <TabsContent value="futures">
                  <ChartTabs />
                </TabsContent>
                <TabsContent value="options">
                  <ChartTabs />
                </TabsContent>
                <TabsContent value="margin">
                  <ChartTabs />
                </TabsContent>
              </Tabs>
            </div>
          </section>

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

          <section id="features" className="mt-10">
            <h2 className="text-xl font-semibold">Features</h2>
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="core">
                <AccordionTrigger>1. Core Function</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Crypto Exchange:</strong> Buy, sell, and trade cryptocurrencies.</li>
                    <li><strong>Spot Trading:</strong> Direct ownership of crypto.</li>
                    <li><strong>Futures & Options:</strong> Speculate on price with leverage, without owning coins.</li>
                    <li><strong>Margin Trading:</strong> Borrow funds to increase trade size.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="funding">
                <AccordionTrigger>2. Funding Methods</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Bank Transfer</strong> (available in some countries, blocked in Pakistan)</li>
                    <li><strong>Debit/Credit Card Purchases</strong></li>
                    <li><strong>P2P (Peer-to-Peer) Trading</strong> – Local methods like Easypaisa, JazzCash, bank.</li>
                    <li><strong>Crypto Deposits</strong> – Transfer from another wallet/exchange.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tools">
                <AccordionTrigger>3. Trading Tools & Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Spot Market</strong> – Real-time buying/selling.</li>
                    <li><strong>Advanced Charting</strong> – Candles, indicators, drawing tools.</li>
                    <li><strong>Order Types:</strong> Limit, Market, Stop-Limit, OCO.</li>
                    <li><strong>Trading Bots</strong> – Automated strategies.</li>
                    <li><strong>Convert Tool</strong> – Simple swaps at market price.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="earn">
                <AccordionTrigger>4. Passive Earning Options</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Binance Earn:</strong> Staking, flexible savings, fixed-term deposits.</li>
                    <li><strong>Launchpool:</strong> Stake to earn new project tokens.</li>
                    <li><strong>Liquidity Farming:</strong> Provide liquidity for fees & rewards.</li>
                    <li><strong>Dual Investment:</strong> Lock funds to earn based on target price/date.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bnb">
                <AccordionTrigger>5. Binance Coin (BNB)</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Utility Token:</strong> Pay trading fees at a discount.</li>
                    <li><strong>Used for:</strong> Staking, payments, Launchpad participation.</li>
                    <li><strong>BNB Chain:</strong> Blockchain for DeFi, NFTs, and apps.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services">
                <AccordionTrigger>6. Additional Services</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Binance Pay:</strong> Send/receive instantly with zero fees.</li>
                    <li><strong>NFT Marketplace:</strong> Buy/sell NFTs.</li>
                    <li><strong>Gift Cards</strong></li>
                    <li><strong>Academy</strong> & <strong>Research Reports</strong></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger>7. Security Measures</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>2FA</strong> – Authenticator or SMS.</li>
                    <li><strong>Withdrawal Whitelist</strong></li>
                    <li><strong>Cold Storage</strong> for majority of funds.</li>
                    <li><strong>Anti-Phishing Codes</strong></li>
                    <li><strong>KYC Verification</strong></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="access">
                <AccordionTrigger>8. Accessibility</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Available in 100+ countries (some restrictions).</li>
                    <li>Web, mobile apps, desktop app.</li>
                    <li>24/7 customer support.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pakistan">
                <AccordionTrigger>9. In Pakistan</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>No direct PKR bank deposits/withdrawals.</li>
                    <li><strong>P2P trading</strong> is the main PKR method.</li>
                    <li>Accessible but unregulated locally; trade at your own risk.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </section>

        <footer className="py-12 border-t">
          <div className="container mx-auto px-6 text-sm text-muted-foreground">
            <p>Demo app. No real trading. {name ? `${name}, ` : ""}your balance is {formatCurrency(convertedBalance, currency)}.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Exchange;
