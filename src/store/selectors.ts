import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type { Category, Transaction } from '@/types/finance';

export const selectRole = (state: RootState) => state.role.selectedRole;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectCategories = (state: RootState) => state.transactions.categories;
export const selectCurrency = (state: RootState) => state.transactions.currency;
export const selectUI = (state: RootState) => state.ui;

export const selectCategoryById = createSelector([selectCategories], (categories) => {
  return categories.reduce<Record<string, Category>>((map, category) => {
    map[category.id] = category;
    return map;
  }, {});
});

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectUI, selectCategoryById],
  (transactions, ui, categoryMap) => {
    const query = ui.searchQuery.trim().toLowerCase();

    return transactions.filter((transaction) => {
      if (ui.typeFilter !== 'all' && transaction.type !== ui.typeFilter) {
        return false;
      }

      if (ui.categoryFilter !== 'all' && transaction.categoryId !== ui.categoryFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      const category = categoryMap[transaction.categoryId];
      const searchSurface = [
        transaction.note,
        transaction.merchant,
        category?.label ?? '',
        transaction.type,
      ]
        .join(' ')
        .toLowerCase();

      return searchSurface.includes(query);
    });
  },
);

export const selectSortedTransactions = createSelector(
  [selectFilteredTransactions, selectUI, selectCategoryById],
  (transactions, ui, categoryMap) => {
    const sorted = [...transactions];

    sorted.sort((a, b) => {
      let result = 0;

      if (ui.sortField === 'date') {
        result = new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (ui.sortField === 'amount') {
        result = a.amount - b.amount;
      }

      if (ui.sortField === 'type') {
        result = a.type.localeCompare(b.type);
      }

      if (ui.sortField === 'category') {
        const aCategory = categoryMap[a.categoryId]?.label ?? '';
        const bCategory = categoryMap[b.categoryId]?.label ?? '';
        result = aCategory.localeCompare(bCategory);
      }

      return ui.sortDirection === 'asc' ? result : result * -1;
    });

    return sorted;
  },
);

export const selectSummary = createSelector([selectFilteredTransactions], (transactions) => {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
});

const monthKey = (value: string) => {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
};

export const selectTrendSeries = createSelector([selectFilteredTransactions], (transactions) => {
  const grouped = transactions.reduce<Record<string, number>>((map, tx) => {
    const key = monthKey(tx.date);
    const delta = tx.type === 'income' ? tx.amount : tx.amount * -1;
    map[key] = (map[key] ?? 0) + delta;
    return map;
  }, {});

  const orderedMonths = Object.keys(grouped).sort();
  let runningBalance = 0;

  return orderedMonths.map((month) => {
    runningBalance += grouped[month];
    return {
      month,
      value: runningBalance,
    };
  });
});

export const selectExpenseBreakdown = createSelector(
  [selectFilteredTransactions, selectCategoryById],
  (transactions, categoryMap) => {
    const expenseMap = transactions
      .filter((tx) => tx.type === 'expense')
      .reduce<Record<string, number>>((map, tx) => {
        map[tx.categoryId] = (map[tx.categoryId] ?? 0) + tx.amount;
        return map;
      }, {});

    const total = Object.values(expenseMap).reduce((sum, value) => sum + value, 0);

    return Object.entries(expenseMap)
      .map(([categoryId, amount]) => ({
        categoryId,
        label: categoryMap[categoryId]?.label ?? categoryId,
        color: categoryMap[categoryId]?.color ?? '#64748b',
        amount,
        percentage: total === 0 ? 0 : (amount / total) * 100,
      }))
      .sort((a, b) => b.amount - a.amount);
  },
);

const monthlyExpenseTotals = (transactions: Transaction[]) => {
  return transactions
    .filter((tx) => tx.type === 'expense')
    .reduce<Record<string, number>>((map, tx) => {
      const key = monthKey(tx.date);
      map[key] = (map[key] ?? 0) + tx.amount;
      return map;
    }, {});
};

export const selectInsights = createSelector(
  [selectExpenseBreakdown, selectFilteredTransactions],
  (breakdown, transactions) => {
    const top = breakdown[0];
    const monthlyTotals = monthlyExpenseTotals(transactions);
    const months = Object.keys(monthlyTotals).sort();

    let monthOverMonthText = 'Not enough monthly data yet.';

    if (months.length >= 2) {
      const current = monthlyTotals[months[months.length - 1]];
      const previous = monthlyTotals[months[months.length - 2]];
      const delta = current - previous;
      const direction = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
      const pct = previous === 0 ? 0 : (Math.abs(delta) / previous) * 100;

      monthOverMonthText = `Expenses are ${direction} ${pct.toFixed(1)}% vs last month.`;
    }

    return {
      highestSpendCategory: top
        ? `${top.label} is leading at ${top.amount.toFixed(2)}.`
        : 'No expense transactions in current view.',
      monthOverMonth: monthOverMonthText,
      dataQuality:
        transactions.length === 0
          ? 'No transactions in current selection.'
          : `${transactions.length} transactions are in scope for analytics.`,
    };
  },
);
