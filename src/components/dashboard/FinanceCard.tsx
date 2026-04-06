import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode } from "react";

interface FinanceCardProps {
  label: string;
  amount: number;
  currency?: string;
  trendPercent: number;
  icon: ReactNode;
  accentBorder?: boolean;
}

export default function FinanceCard({
  label,
  amount,
  currency = "$",
  trendPercent,
  icon,
  accentBorder = false,
}: FinanceCardProps) {
  const isPositive = trendPercent >= 0;
  const formattedWhole = Math.floor(Math.abs(amount)).toLocaleString("en-US");
  const formattedCents = ".00";

  return (
    <article
      className={`flex flex-col justify-between rounded-2xl border bg-white px-5 py-5 ${
        accentBorder ? "border-[#7B61FF]/20" : "border-[#E5E5EF]"
      }`}
    >
      {/* Top row: label + action icon */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F2FF] text-[#7B61FF]">
            {icon}
          </span>
          <span className="text-sm font-medium text-[#1C1C28]">{label}</span>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A2A2B5] transition-colors hover:bg-[#F4F2FF] hover:text-[#7B61FF]"
          aria-label={`View ${label} details`}
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Amount */}
      <div className="mt-4">
        <p className="text-[28px] leading-tight font-bold text-[#1C1C28]">
          {currency}
          {formattedWhole}
          <span className="font-normal text-[#A2A2B5]">{formattedCents}</span>
        </p>
      </div>

      {/* Trend chip */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "bg-[#E8F8EF] text-[#22C55E]"
              : "bg-[#FEF2F2] text-[#EF4444]"
          }`}
        >
          {isPositive ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {Math.abs(trendPercent).toFixed(1)}%
        </span>
        <span className="text-xs text-[#A2A2B5]">vs last month</span>
      </div>
    </article>
  );
}
