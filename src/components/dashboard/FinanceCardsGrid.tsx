"use client";

import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectSummary, selectCardTrends } from "@/store/selectors";
import FinanceCard from "./FinanceCard";

export default function FinanceCardsGrid() {
  const summary = useAppSelector(selectSummary);
  const trends = useAppSelector(selectCardTrends);

  const cards = [
    {
      label: "Total balance",
      amount: summary.balance,
      trendPercent: trends.balance,
      icon: <Wallet size={18} />,
      accentBorder: true,
    },
    {
      label: "Income",
      amount: summary.income,
      trendPercent: trends.income,
      icon: <ArrowDownLeft size={18} />,
      accentBorder: true,
    },
    {
      label: "Expense",
      amount: summary.expenses,
      trendPercent: trends.expense,
      icon: <ArrowUpRight size={18} />,
      accentBorder: false,
    },
    {
      label: "Total savings",
      amount: summary.savings,
      trendPercent: trends.savings,
      icon: <PiggyBank size={18} />,
      accentBorder: false,
    },
  ];

  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Financial overview"
    >
      {cards.map((card) => (
        <FinanceCard key={card.label} {...card} />
      ))}
    </section>
  );
}
