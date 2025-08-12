import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const priceData = [
  { t: "10:00", price: 64000 },
  { t: "10:05", price: 64120 },
  { t: "10:10", price: 63950 },
  { t: "10:15", price: 64210 },
  { t: "10:20", price: 64300 },
  { t: "10:25", price: 64240 },
  { t: "10:30", price: 64420 },
];

const volumeData = [
  { t: "10:00", volume: 1200 },
  { t: "10:05", volume: 1800 },
  { t: "10:10", volume: 900 },
  { t: "10:15", volume: 1500 },
  { t: "10:20", volume: 2300 },
  { t: "10:25", volume: 1700 },
  { t: "10:30", volume: 2600 },
];

const depthData = [
  { level: "-3", bids: 4.2, asks: 0 },
  { level: "-2", bids: 5.1, asks: 0 },
  { level: "-1", bids: 7.6, asks: 0 },
  { level: "0", bids: 0, asks: 0 },
  { level: "+1", bids: 0, asks: 6.3 },
  { level: "+2", bids: 0, asks: 4.9 },
  { level: "+3", bids: 0, asks: 3.2 },
];

const ChartTabs: React.FC = () => {
  return (
    <Tabs defaultValue="price" className="w-full">
      <TabsList>
        <TabsTrigger value="price">Price</TabsTrigger>
        <TabsTrigger value="volume">Volume</TabsTrigger>
        <TabsTrigger value="depth">Order Book</TabsTrigger>
      </TabsList>

      <TabsContent value="price">
        <div className="h-64 w-full rounded-md border bg-card">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--muted))" />
              <XAxis dataKey="t" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[63800, 64600]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="volume">
        <div className="h-64 w-full rounded-md border bg-card">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--muted))" />
              <XAxis dataKey="t" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--primary))"
                fill="url(#fillPrimary)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="depth">
        <div className="h-64 w-full rounded-md border bg-card">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={depthData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--muted))" />
              <XAxis dataKey="level" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="bids" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="asks" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
