import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dashboardData from '@/data/data.json';
import type { Category, DashboardData, Transaction } from '@/types/finance';

interface TransactionsState {
  items: Transaction[];
  categories: Category[];
  currency: string;
}

interface AddTransactionPayload {
  date: string;
  amount: number;
  categoryId: string;
  type: Transaction['type'];
  note: string;
  merchant: string;
}

const seed = dashboardData as DashboardData;

const initialState: TransactionsState = {
  items: seed.transactions,
  categories: seed.categories,
  currency: seed.meta.defaultCurrency,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<AddTransactionPayload>) => {
      const now = new Date().toISOString();
      const next: Transaction = {
        id: `tx-${crypto.randomUUID()}`,
        currency: state.currency,
        tags: [],
        createdAt: now,
        updatedAt: now,
        ...action.payload,
      };
      state.items.unshift(next);
    },
    updateTransaction: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<AddTransactionPayload> }>,
    ) => {
      const target = state.items.find((item) => item.id === action.payload.id);
      if (!target) {
        return;
      }

      Object.assign(target, action.payload.updates);
      target.updatedAt = new Date().toISOString();
    },
  },
});

export const { addTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
