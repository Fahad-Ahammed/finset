"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectTransactions } from "@/store/selectors";

interface MonthData {
  month: string;
  label: string;
  income: number;
  expense: number;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Mock fallback data matching the 7-month density in the design */
const MOCK_DATA: MonthData[] = [
  { month: "2026-01", label: "Jan", income: 4200, expense: 3200 },
  { month: "2026-02", label: "Feb", income: 5600, expense: 4100 },
  { month: "2026-03", label: "Mar", income: 10000, expense: 7200 },
  { month: "2026-04", label: "Apr", income: 8200, expense: 5800 },
  { month: "2026-05", label: "May", income: 6500, expense: 4900 },
  { month: "2026-06", label: "Jun", income: 3800, expense: 2600 },
  { month: "2026-07", label: "Jul", income: 5200, expense: 3900 },
];

function buildChartData(
  transactions: ReturnType<typeof selectTransactions>,
): MonthData[] {
  const buckets: Record<string, { income: number; expense: number }> = {};

  for (const tx of transactions) {
    const d = new Date(tx.date);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    if (!buckets[key]) buckets[key] = { income: 0, expense: 0 };
    if (tx.type === "income") buckets[key].income += tx.amount;
    else buckets[key].expense += tx.amount;
  }

  const months = Object.keys(buckets).sort();
  if (months.length < 4) return MOCK_DATA;

  return months.map((m) => ({
    month: m,
    label: MONTH_LABELS[parseInt(m.split("-")[1], 10) - 1],
    income: buckets[m].income,
    expense: buckets[m].expense,
  }));
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ dataKey?: string; value?: number }> }) {
  if (!active || !payload?.length) return null;
  const income = payload.find((p) => p.dataKey === "income")?.value ?? 0;
  return (
    <div className="rounded-lg bg-[#1C1C28] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
      ${income.toLocaleString("en-US")}
    </div>
  );
}

/** Rounded-top bar shape */
function RoundedBar(props: Record<string, unknown>) {
  const { x, y, width, height, fill } = props as {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
  };
  if (!height || height <= 0) return null;
  const r = Math.min(6, width / 2, height);
  return (
    <path
      d={`M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`}
      fill={fill}
    />
  );
}

export default function MoneyFlowChart() {
  const transactions = useAppSelector(selectTransactions);
  const data = buildChartData(transactions);
  const [timeFilter] = useState("This year");

  return (
    <section className="flex flex-col rounded-2xl border border-[#E5E5EF] bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[#1C1C28]">Money flow</h2>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium text-[#A2A2B5]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#C6B8FF]" />
              Expense
            </span>
          </div>

          {/* Filters */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E5EF] px-3 py-1.5 text-xs font-medium text-[#1C1C28] transition-colors hover:bg-[#F4F2FF]"
          >
            {timeFilter}
            <ChevronDown size={14} className="text-[#A2A2B5]" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-65 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={2}
            barCategoryGap="20%"
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E5EF"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A2A2B5", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A2A2B5", fontSize: 12 }}
              tickFormatter={(v: number) =>
                v === 0 ? "0" : `$${(v / 1000).toFixed(0)},000`
              }
              domain={[0, 15000]}
              ticks={[0, 1000, 5000, 10000, 15000]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(123,97,255,0.04)" }}
            />
            <Bar
              dataKey="income"
              fill="#7B61FF"
              shape={<RoundedBar />}
              maxBarSize={24}
            />
            <Bar
              dataKey="expense"
              fill="#C6B8FF"
              shape={<RoundedBar />}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
