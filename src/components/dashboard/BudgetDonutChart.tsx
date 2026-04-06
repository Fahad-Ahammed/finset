"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectExpenseBreakdown } from "@/store/selectors";

interface BudgetItem {
  label: string;
  amount: number;
  color: string;
  percentage: number;
}

/** Fallback data matching design's category density */
const MOCK_BUDGET: BudgetItem[] = [
  { label: "Cafe & Restaurants", amount: 850, color: "#7B61FF", percentage: 14.3 },
  { label: "Entertainment", amount: 640, color: "#C6B8FF", percentage: 10.8 },
  { label: "Investments", amount: 1200, color: "#1C1C28", percentage: 20.2 },
  { label: "Food & Groceries", amount: 960, color: "#A2A2B5", percentage: 16.1 },
  { label: "Health & Beauty", amount: 400, color: "#E5E5EF", percentage: 6.7 },
  { label: "Traveling", amount: 1900, color: "#F0EDFF", percentage: 31.9 },
];

function useBudgetData() {
  const breakdown = useAppSelector(selectExpenseBreakdown);

  if (breakdown.length < 3) return { items: MOCK_BUDGET, total: 5950 };

  const budgetItems: BudgetItem[] = breakdown.map((b, i) => {
    const colors = ["#7B61FF", "#C6B8FF", "#1C1C28", "#A2A2B5", "#E5E5EF", "#F0EDFF"];
    return {
      label: b.label,
      amount: b.amount,
      color: colors[i % colors.length],
      percentage: b.percentage,
    };
  });

  const total = budgetItems.reduce((s, b) => s + b.amount, 0);
  return { items: budgetItems, total };
}

export default function BudgetDonutChart() {
  const { items, total } = useBudgetData();
  const topItem = items[0];

  return (
    <section className="flex flex-col rounded-2xl border border-[#E5E5EF] bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1C1C28]">Budget</h2>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A2A2B5] transition-colors hover:bg-[#F4F2FF] hover:text-[#7B61FF]"
          aria-label="View budget details"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="flex flex-1 gap-5">
        {/* Legend */}
        <ul className="flex flex-col justify-center gap-2.5" role="list">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[#A2A2B5]">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Donut */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* % badge at top */}
          {topItem && (
            <div className="absolute -top-1 right-0 flex items-center gap-1 rounded-full bg-[#F4F2FF] px-2 py-0.5 text-[10px] font-semibold text-[#7B61FF]">
              {topItem.percentage.toFixed(0)}%
              <span className="text-[#A2A2B5]">
                ${topItem.amount.toLocaleString("en-US")}
              </span>
            </div>
          )}

          <div className="h-45 w-45">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={items}
                  dataKey="amount"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                  paddingAngle={2}
                  cornerRadius={6}
                >
                  {items.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-[#A2A2B5]">Total for month</span>
            <span className="text-xl font-bold text-[#1C1C28]">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
