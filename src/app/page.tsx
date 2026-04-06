import FinanceCardsGrid from "@/components/dashboard/FinanceCardsGrid";
import MoneyFlowChart from "@/components/dashboard/MoneyFlowChart";
import BudgetDonutChart from "@/components/dashboard/BudgetDonutChart";
import TransactionList from "@/components/dashboard/TransactionList";
import QuickInsights from "@/components/dashboard/QuickInsights";

export default function HomePage() {
  return (
      <div className="flex-1 bg-white">
          <div className="flex-1 px-8 pb-8">
            <FinanceCardsGrid />

            {/* Charts row — Money flow + Budget */}
            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
              <MoneyFlowChart />
              <BudgetDonutChart />
            </div>

            {/*Insights + Recent transactions */}
            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[60%_40%]">
              <TransactionList limit={5} />
              <QuickInsights />
            </div>
          </div>
      </div>
  );
}
