export type Role = 'viewer' | 'admin';
export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  label: string;
  type: TransactionType;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  categoryId: string;
  type: TransactionType;
  note: string;
  merchant: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMeta {
  appName: string;
  defaultCurrency: string;
  timezone: string;
  generatedAt: string;
}

export interface DashboardData {
  meta: DashboardMeta;
  roles: {
    availableRoles: Role[];
    defaultRole: Role;
  };
  uiDefaults: {
    defaultSort: {
      field: SortField;
      direction: SortDirection;
    };
    defaultFilters: {
      type: 'all' | TransactionType;
      categories: string[];
    };
    searchQuery: string;
  };
  categories: Category[];
  transactions: Transaction[];
  insightsConfig: {
    compareWindowMonths: number;
    topCategoriesLimit: number;
    largeExpenseThreshold: number;
  };
}

export type SortField = 'date' | 'amount' | 'category' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface UIState {
  searchQuery: string;
  typeFilter: 'all' | TransactionType;
  categoryFilter: 'all' | string;
  sortField: SortField;
  sortDirection: SortDirection;
}
