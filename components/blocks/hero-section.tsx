"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { ChartArea, Check, ChevronsRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueItem {
  month: string;
  revenue: number;
  target: number;
}

interface SalesItem {
  name: string;
  sales: number;
}

interface ModuleItem {
  name: string;
  value: number;
}

const DashboardChart = () => {
  const [revenueData, setRevenueData] = useState<RevenueItem[]>([
    { month: "Jan", revenue: 12400, target: 10000 },
    { month: "Feb", revenue: 14800, target: 11000 },
    { month: "Mar", revenue: 13900, target: 12000 },
    { month: "Apr", revenue: 17600, target: 13000 },
    { month: "May", revenue: 16400, target: 14000 },
    { month: "Jun", revenue: 19200, target: 15000 },
  ]);

  const [salesData, setSalesData] = useState<SalesItem[]>([
    { name: "Basic", sales: 340 },
    { name: "Pro", sales: 520 },
    { name: "Enterprise", sales: 280 },
  ]);

  const [moduleUsageData, setModuleUsageData] = useState<ModuleItem[]>([
    { name: "HR", value: 35 },
    { name: "Finance", value: 25 },
    { name: "CRM", value: 20 },
    { name: "Inventory", value: 15 },
  ]);

  const revenueChartConfig: ChartConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
    },
    target: {
      label: "Target",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
    },
  };

  const salesChartConfig: ChartConfig = {
    Basic: {
      label: "Basic",
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
    },
    Pro: {
      label: "Pro",
      theme: {
        light: "#1d4ed8",
        dark: "#2563eb",
      },
    },
    Enterprise: {
      label: "Enterprise",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa",
      },
    },
  };

  const moduleChartConfig: ChartConfig = {
    HR: {
      label: "HR",
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
    },
    Finance: {
      label: "Finance",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
    },
    CRM: {
      label: "CRM",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa",
      },
    },
    Inventory: {
      label: "Inventory",
      theme: {
        light: "#fbbf24",
        dark: "#f59e0b",
      },
    },
  };

  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= 1000) {
        lastUpdateRef.current = now;
        updateChartData();
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  const updateChartData = () => {
    setRevenueData((prev) =>
      prev.map((item) => ({
        ...item,
        revenue: Math.max(
          item.revenue * (1 + (Math.random() * 0.01 - 0.005)),
          0
        ),
      }))
    );

    setSalesData((prev) =>
      prev.map((item) => ({
        ...item,
        sales: Math.max(item.sales * (1 + (Math.random() * 0.008 - 0.004)), 0),
      }))
    );

    setModuleUsageData((prev) => {
      const withChanges = prev.map((item) => ({
        ...item,
        value: Math.max(item.value * (1 + (Math.random() * 0.01 - 0.005)), 1),
      }));

      const newSum = withChanges.reduce((sum, item) => sum + item.value, 0);
      return withChanges.map((item) => ({
        ...item,
        value: (item.value / newSum) * 100,
      }));
    });
  };

  return (
    <div className="bg-background flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-lg">
      <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-1.5">
        <h3 className="text-xs font-semibold">Enterprise Analytics</h3>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
          </span>
          <span className="text-muted-foreground text-xs">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3">
        <div className="bg-card col-span-2 overflow-hidden rounded-lg border p-2">
          <div className="mb-1 flex items-center justify-between">
            <h4 className="text-xs font-medium">Revenue Performance</h4>
          </div>
          <div className="h-28 w-full">
            <ChartContainer
              className="h-full w-full"
              config={revenueChartConfig}
            >
              <AreaChart
                data={revenueData}
                margin={{ top: 5, right: 0, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  dy={2}
                />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tick={{ fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="line" />}
                  cursor={false}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="var(--color-target)"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  fill="none"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 3,
                    stroke: "var(--color-revenue)",
                    strokeWidth: 1,
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        <div className="bg-card overflow-hidden rounded-lg border p-2">
          <h4 className="mb-1 text-xs font-medium">Sales by Package</h4>
          <div className="h-24 w-full">
            <ChartContainer className="h-full w-full" config={salesChartConfig}>
              <BarChart
                data={salesData}
                layout="vertical"
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  width={55}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                  {salesData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={`var(--color-${entry.name})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <div className="bg-card overflow-hidden rounded-lg border p-2">
          <h4 className="mb-1 text-xs font-medium">Module Usage</h4>
          <div className="h-24 w-full">
            <ChartContainer
              className="h-full w-full"
              config={moduleChartConfig}
            >
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={moduleUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {moduleUsageData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={`var(--color-${entry.name})`}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 divide-x border-t">
        <div className="flex flex-col items-center justify-center py-2">
          <p className="text-muted-foreground text-xs">Revenue</p>
          <p className="text-sm font-semibold">$24,502</p>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <p className="text-muted-foreground text-xs">Active Users</p>
          <p className="text-sm font-semibold">1,203</p>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <p className="text-muted-foreground text-xs">New Clients</p>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            +12.5%
          </p>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const keyFeatures = [
    "Multi-tenant architecture with complete data isolation",
    "Modular design with flexible subscription options",
    "Comprehensive reseller management tools",
  ];

  return (
    <section className="from-muted/50 to-background relative overflow-hidden bg-gradient-to-b pt-6 pb-16 md:pt-8 md:pb-20 lg:pb-28 xl:pb-32">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl md:h-96 md:w-96"></div>
        <div className="absolute top-1/2 left-1/4 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl md:h-64 md:w-64"></div>
        <div className="absolute right-1/3 bottom-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl md:h-64 md:w-64"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="items-center lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="text-center sm:text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-4 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium md:mb-6 md:text-sm"
              >
                <ChartArea />
                <span className="truncate">New Module: Advanced Analytics</span>
              </Badge>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                <span className="inline sm:block">Enterprise Resource</span>{" "}
                <span className="from-primary inline-block bg-gradient-to-r to-blue-600 bg-clip-text text-transparent sm:mt-1 sm:block">
                  Planning Solution
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mt-3 text-base sm:mt-5 sm:max-w-xl md:mt-4 md:text-lg lg:mx-0">
                A comprehensive ERP platform that enables resellers to manage
                multiple client businesses with secure data isolation, flexible
                modules, and an exceptional user experience.
              </p>

              <ul className="text-muted-foreground mx-auto mt-4 max-w-md space-y-2 text-xs md:mt-6 md:max-w-xl md:text-sm lg:mx-0">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start md:items-center">
                    <Check className="text-primary mt-0.5 mr-2 h-4 w-4 flex-shrink-0 md:mt-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-8 lg:justify-start">
                <Link href="/register" className="block sm:inline-block">
                  <Button
                    size={isMobile ? "default" : "lg"}
                    className="group relative w-full overflow-hidden px-6 sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Get started
                      <ChevronsRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>

                <Link href="/demo">
                  <Button
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    className="w-full sm:w-auto"
                  >
                    Request a demo
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size={isMobile ? "default" : "lg"}
                  className="space-x-2"
                >
                  <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-white md:h-6 md:w-6">
                    <Play className="ml-0.5 h-2.5 w-2.5 md:h-3 md:w-3 dark:text-black" />
                  </div>
                  <span>Watch video</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-12 lg:col-span-6 lg:mt-0 xl:col-span-7">
            <div className="relative mx-auto max-w-sm px-4 sm:max-w-md sm:px-0 md:max-w-lg lg:max-w-none">
              <div className="relative z-20">
                <div className="relative overflow-hidden rounded-xl border shadow-xl md:rounded-2xl md:shadow-2xl">
                  <DashboardChart />
                </div>

                <Card className="absolute top-4 right-0 z-30 w-48 translate-x-4 transform shadow-lg sm:w-56 sm:translate-x-1/6 md:top-6 md:w-60 md:translate-x-1/4">
                  <CardContent className="p-3 md:p-4">
                    <h4 className="text-xs font-medium md:text-sm">
                      Monthly Performance
                    </h4>
                    <div className="mt-2 space-y-1.5 md:space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-[10px] md:text-xs">
                          Revenue
                        </span>
                        <span className="text-[10px] font-medium md:text-xs">
                          $24,502
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-[10px] md:text-xs">
                          New Clients
                        </span>
                        <span className="text-[10px] font-medium text-emerald-600 md:text-xs">
                          +12.5%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-[10px] md:text-xs">
                          Active Users
                        </span>
                        <span className="text-[10px] font-medium md:text-xs">
                          1,203
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute -bottom-2 left-0 z-30 -translate-x-4 transform shadow-lg sm:-translate-x-1/6 md:-bottom-4 md:-translate-x-1/4">
                  <CardContent className="p-2 md:p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 md:h-8 md:w-8">
                        <span className="text-[10px] font-medium text-blue-600 md:text-xs">
                          JD
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium md:text-xs">
                          John completed onboarding
                        </p>
                        <p className="text-muted-foreground text-[8px] md:text-xs">
                          Just now
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="from-primary/30 absolute top-0 right-0 -z-10 h-full w-full scale-105 -rotate-3 transform rounded-xl bg-gradient-to-br to-blue-500/30 md:rounded-2xl"></div>

              <div className="absolute -top-4 left-8 z-10 h-8 w-8 -rotate-6 rounded-lg border border-yellow-400/30 bg-yellow-400/20 backdrop-blur-sm md:-top-6 md:left-10 md:h-12 md:w-12"></div>
              <div className="absolute right-10 -bottom-4 z-10 h-10 w-10 rounded-full border border-emerald-400/30 bg-emerald-400/20 backdrop-blur-sm md:right-12 md:-bottom-6 md:h-16 md:w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
