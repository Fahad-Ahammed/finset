import FinanceCardsGrid from "@/components/dashboard/FinanceCardsGrid";
import MoneyFlowChart from "@/components/dashboard/MoneyFlowChart";
import BudgetDonutChart from "@/components/dashboard/BudgetDonutChart";

export default function HomePage() {
  return (
      <div className="flex-1 bg-white">
          <div className="flex-1 px-8 pb-8">
            <FinanceCardsGrid />

            {/* Charts row — Money flow (wider) + Budget (narrower) */}
            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
              <MoneyFlowChart />
              <BudgetDonutChart />
            </div>

            <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-[#E5E5EF] py-20">
              <p className="text-lg font-medium text-[#A2A2B5]">
                pending work
              </p>
            </div>
          </div>
      </div>
  );
}
