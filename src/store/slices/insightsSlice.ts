import { createSlice } from '@reduxjs/toolkit';
import dashboardData from '@/data/data.json';
import type { DashboardData, InsightItem } from '@/types/finance';

interface InsightsState {
  summary: string;
  lastUpdated: string;
  items: InsightItem[];
}

const seed = dashboardData as DashboardData;

const initialState: InsightsState = {
  summary: seed.insights.summary,
  lastUpdated: seed.insights.lastUpdated,
  items: seed.insights.items,
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {},
});

export default insightsSlice.reducer;
