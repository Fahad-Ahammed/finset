import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dashboardData from '@/data/data.json';
import type { DashboardData, SortDirection, SortField, TransactionType, UIState } from '@/types/finance';

const seed = dashboardData as DashboardData;

const initialState: UIState = {
  searchQuery: seed.uiDefaults.searchQuery,
  typeFilter: seed.uiDefaults.defaultFilters.type,
  categoryFilter: 'all',
  sortField: seed.uiDefaults.defaultSort.field,
  sortDirection: seed.uiDefaults.defaultSort.direction,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<'all' | TransactionType>) => {
      state.typeFilter = action.payload;
      state.categoryFilter = 'all';
    },
    setCategoryFilter: (state, action: PayloadAction<'all' | string>) => {
      state.categoryFilter = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{ field: SortField; direction: SortDirection }>,
    ) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.typeFilter = 'all';
      state.categoryFilter = 'all';
      state.sortField = seed.uiDefaults.defaultSort.field;
      state.sortDirection = seed.uiDefaults.defaultSort.direction;
    },
  },
});

export const {
  setSearchQuery,
  setTypeFilter,
  setCategoryFilter,
  setSort,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
