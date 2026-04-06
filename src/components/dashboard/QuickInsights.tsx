'use client';

import { useAppSelector } from '@/store/hooks';
import { selectInsightsData } from '@/store/selectors';
import { TrendingUp, TrendingDown, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import type { InsightType } from '@/types/finance';

const iconMap: Record<InsightType, React.ElementType> = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  critical: AlertTriangle,
};

const styleMap: Record<InsightType, { bg: string; text: string; border: string }> = {
  warning: { bg: 'bg-[#FFF7ED]', text: 'text-[#F97316]', border: 'border-[#FDBA74]' },
  info: { bg: 'bg-[#EFF6FF]', text: 'text-[#3B82F6]', border: 'border-[#93C5FD]' },
  success: { bg: 'bg-[#F0FDF4]', text: 'text-[#22C55E]', border: 'border-[#86EFAC]' },
  critical: { bg: 'bg-[#FEF2F2]', text: 'text-[#EF4444]', border: 'border-[#FCA5A5]' },
};

export default function QuickInsights() {
  const insights = useAppSelector(selectInsightsData);

  return (
    <section className="min-w-0 rounded-2xl border border-[#E5E5EF] bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#1C1C28]">{insights.summary}</h2>
        <span className="text-[10px] text-[#A2A2B5]">{insights.lastUpdated}</span>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {insights.items.map((item) => {
          const style = styleMap[item.type];
          const Icon = iconMap[item.type];

          return (
            <div
              key={item.id}
              className={`rounded-lg border ${style.border} ${style.bg} px-3 py-2.5`}
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${style.bg} ${style.text}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-[#1C1C28] truncate">{item.title}</h3>
                    {item.trend === 'up' && <TrendingUp size={12} className="shrink-0 text-[#EF4444]" />}
                    {item.trend === 'down' && <TrendingDown size={12} className="shrink-0 text-[#22C55E]" />}
                  </div>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#6E6E80] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
