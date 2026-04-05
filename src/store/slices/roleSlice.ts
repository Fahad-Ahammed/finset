import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dashboardData from '@/data/data.json';
import type { DashboardData, Role } from '@/types/finance';

const seed = dashboardData as DashboardData;

interface RoleState {
  selectedRole: Role;
}

const initialState: RoleState = {
  selectedRole: seed.roles.defaultRole,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
