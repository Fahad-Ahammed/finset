'use client';

import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCategories,
  selectCategoryById,
  selectRole,
  selectSortedTransactions,
  selectUI,
} from '@/store/selectors';
import {
  resetFilters,
  setCategoryFilter,
  setSearchQuery,
  setSort,
  setTypeFilter,
} from '@/store/slices/uiSlice';
import { addTransaction, updateTransaction } from '@/store/slices/transactionsSlice';
import { Search, Plus, Pencil, RotateCcw, X, ChevronDown } from 'lucide-react';
import type { SortDirection, SortField, Transaction, TransactionType } from '@/types/finance';

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
};

type FormModel = {
  id?: string;
  date: string;
  amount: string;
  type: TransactionType;
  categoryId: string;
  note: string;
  merchant: string;
};

const emptyForm: FormModel = {
  date: new Date().toISOString().slice(0, 10),
  amount: '',
  type: 'expense',
  categoryId: '',
  note: '',
  merchant: '',
};

function TransactionList() {
  const dispatch = useAppDispatch();

  const role = useAppSelector(selectRole);
  const ui = useAppSelector(selectUI);
  const categories = useAppSelector(selectCategories);
  const categoryById = useAppSelector(selectCategoryById);
  const transactions = useAppSelector(selectSortedTransactions);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormModel>(emptyForm);

  const editableCategories = useMemo(() => {
    return categories.filter((category) => category.type === form.type);
  }, [categories, form.type]);

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm, categoryId: '' });
    setFormOpen(true);
  };

  const openEditForm = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setForm({
      id: transaction.id,
      date: transaction.date,
      amount: String(transaction.amount),
      type: transaction.type,
      categoryId: transaction.categoryId,
      note: transaction.note,
      merchant: transaction.merchant,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.categoryId || !form.amount || Number(form.amount) <= 0) {
      return;
    }

    if (editingId) {
      dispatch(
        updateTransaction({
          id: editingId,
          updates: {
            date: form.date,
            amount: Number(form.amount),
            type: form.type,
            categoryId: form.categoryId,
            note: form.note,
            merchant: form.merchant,
          },
        }),
      );
    } else {
      dispatch(
        addTransaction({
          date: form.date,
          amount: Number(form.amount),
          type: form.type,
          categoryId: form.categoryId,
          note: form.note,
          merchant: form.merchant,
        }),
      );
    }

    closeForm();
  };

  const sortOptions: { label: string; field: SortField; direction: SortDirection }[] = [
    { label: 'Newest', field: 'date', direction: 'desc' },
    { label: 'Oldest', field: 'date', direction: 'asc' },
    { label: 'Amount High', field: 'amount', direction: 'desc' },
    { label: 'Amount Low', field: 'amount', direction: 'asc' },
  ];

  return (
    <div className="flex-1 bg-white">
      <div className="px-8 pb-8">
        <section className="rounded-2xl border border-[#E5E5EF] bg-white p-6">
          {/* Header row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg font-semibold text-[#1C1C28]">Transactions</h2>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
                <input
                  type="search"
                  value={ui.searchQuery}
                  placeholder="Search note, merchant, category"
                  onChange={(event) => dispatch(setSearchQuery(event.target.value))}
                  className="min-w-64 rounded-lg border border-[#E5E5EF] bg-white py-2 pl-9 pr-3 text-xs font-medium text-[#1C1C28] placeholder:text-[#A2A2B5] transition-colors focus:border-[#7B61FF] focus:outline-none"
                />
              </div>

              {/* Type filter */}
              <div className="relative">
                <select
                  value={ui.typeFilter}
                  onChange={(event) => dispatch(setTypeFilter(event.target.value as 'all' | TransactionType))}
                  className="appearance-none rounded-lg border border-[#E5E5EF] bg-white py-2 pl-3 pr-8 text-xs font-medium text-[#1C1C28] transition-colors hover:bg-[#F4F2FF] focus:border-[#7B61FF] focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
              </div>

              {/* Category filter */}
              <div className="relative">
                <select
                  value={ui.categoryFilter}
                  onChange={(event) => dispatch(setCategoryFilter(event.target.value))}
                  className="appearance-none rounded-lg border border-[#E5E5EF] bg-white py-2 pl-3 pr-8 text-xs font-medium text-[#1C1C28] transition-colors hover:bg-[#F4F2FF] focus:border-[#7B61FF] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter((category) => ui.typeFilter === 'all' || category.type === ui.typeFilter)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={`${ui.sortField}:${ui.sortDirection}`}
                  onChange={(event) => {
                    const [field, direction] = event.target.value.split(':') as [SortField, SortDirection];
                    dispatch(setSort({ field, direction }));
                  }}
                  className="appearance-none rounded-lg border border-[#E5E5EF] bg-white py-2 pl-3 pr-8 text-xs font-medium text-[#1C1C28] transition-colors hover:bg-[#F4F2FF] focus:border-[#7B61FF] focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={`${option.field}-${option.direction}`} value={`${option.field}:${option.direction}`}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={() => dispatch(resetFilters())}
                className="flex items-center gap-1.5 rounded-lg border border-[#E5E5EF] px-3 py-2 text-xs font-medium text-[#A2A2B5] transition-colors hover:bg-[#F4F2FF] hover:text-[#7B61FF]"
              >
                <RotateCcw size={13} />
                Reset
              </button>

              {/* Add Transaction */}
              {role === 'admin' && (
                <button
                  type="button"
                  onClick={openAddForm}
                  className="flex items-center gap-1.5 rounded-lg bg-[#7B61FF] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#6B4FE0]"
                >
                  <Plus size={14} />
                  Add Transaction
                </button>
              )}
            </div>
          </div>

          {/* Table or empty state */}
          {transactions.length === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-[#E5E5EF] bg-[#FAFAFE] py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F2FF] text-[#7B61FF]">
                <Search size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1C1C28]">No matching transactions</p>
              <p className="mt-1 text-xs text-[#A2A2B5]">Adjust your filters or add a new transaction.</p>
            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-180 text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5EF]">
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Date</th>
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Type</th>
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Category</th>
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Merchant</th>
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Amount</th>
                    <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]">Note</th>
                    {role === 'admin' && <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A2A2B5]" />}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const cat = categoryById[tx.categoryId];
                    return (
                      <tr key={tx.id} className="border-b border-[#F0EDFF]/60 transition-colors hover:bg-[#FAFAFE]">
                        <td className="px-3 py-3.5 text-xs text-[#A2A2B5]">{formatDate(tx.date)}</td>
                        <td className="px-3 py-3.5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              tx.type === 'income'
                                ? 'bg-[#E8F8EF] text-[#22C55E]'
                                : 'bg-[#FEF2F2] text-[#EF4444]'
                            }`}
                          >
                            {tx.type === 'income' ? '+ Income' : '- Expense'}
                          </span>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="flex items-center gap-2 text-xs font-medium text-[#1C1C28]">
                            {cat?.color && (
                              <span
                                className="inline-block h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: cat.color }}
                              />
                            )}
                            {cat?.label ?? tx.categoryId}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-xs text-[#1C1C28]">{tx.merchant || <span className="text-[#E5E5EF]">&mdash;</span>}</td>
                        <td className="px-3 py-3.5">
                          <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-[#22C55E]' : 'text-[#1C1C28]'}`}>
                            {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                          </span>
                        </td>
                        <td className="max-w-50 truncate px-3 py-3.5 text-xs text-[#A2A2B5]">{tx.note || <span className="text-[#E5E5EF]">&mdash;</span>}</td>
                        {role === 'admin' && (
                          <td className="px-3 py-3.5">
                            <button
                              type="button"
                              onClick={() => openEditForm(tx)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A2A2B5] transition-colors hover:bg-[#F4F2FF] hover:text-[#7B61FF]"
                              aria-label={`Edit transaction ${tx.id}`}
                            >
                              <Pencil size={14} />
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Modal */}
      {formOpen && role === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C28]/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-xl rounded-2xl border border-[#E5E5EF] bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1C1C28]">{editingId ? 'Edit Transaction' : 'New Transaction'}</h3>
              <button
                type="button"
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A2A2B5] transition-colors hover:bg-[#F4F2FF] hover:text-[#7B61FF]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5]">
                Date
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                  className="rounded-lg border border-[#E5E5EF] px-3 py-2.5 text-sm text-[#1C1C28] focus:border-[#7B61FF] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5]">
                Amount
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={form.amount}
                  onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                  className="rounded-lg border border-[#E5E5EF] px-3 py-2.5 text-sm text-[#1C1C28] focus:border-[#7B61FF] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5]">
                Type
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={(event) => {
                      const nextType = event.target.value as TransactionType;
                      const firstCategory = categories.find((category) => category.type === nextType)?.id ?? '';
                      setForm((prev) => ({
                        ...prev,
                        type: nextType,
                        categoryId: firstCategory,
                      }));
                    }}
                    className="w-full appearance-none rounded-lg border border-[#E5E5EF] bg-white py-2.5 pl-3 pr-8 text-sm text-[#1C1C28] focus:border-[#7B61FF] focus:outline-none"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
                </div>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5]">
                Category
                <div className="relative">
                  <select
                    required
                    value={form.categoryId}
                    onChange={(event) => setForm((prev) => ({ ...prev, categoryId: event.target.value }))}
                    className="w-full appearance-none rounded-lg border border-[#E5E5EF] bg-white py-2.5 pl-3 pr-8 text-sm text-[#1C1C28] focus:border-[#7B61FF] focus:outline-none"
                  >
                    <option value="">Select category</option>
                    {editableCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A2A2B5]" />
                </div>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5] sm:col-span-2">
                Merchant
                <input
                  type="text"
                  value={form.merchant}
                  onChange={(event) => setForm((prev) => ({ ...prev, merchant: event.target.value }))}
                  className="rounded-lg border border-[#E5E5EF] px-3 py-2.5 text-sm text-[#1C1C28] placeholder:text-[#A2A2B5] focus:border-[#7B61FF] focus:outline-none"
                  placeholder="e.g. Amazon, Starbucks"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-medium text-[#A2A2B5] sm:col-span-2">
                Note
                <input
                  type="text"
                  value={form.note}
                  onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                  className="rounded-lg border border-[#E5E5EF] px-3 py-2.5 text-sm text-[#1C1C28] placeholder:text-[#A2A2B5] focus:border-[#7B61FF] focus:outline-none"
                  placeholder="Optional description"
                />
              </label>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-[#E5E5EF] px-4 py-2 text-xs font-medium text-[#1C1C28] transition-colors hover:bg-[#F4F2FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#7B61FF] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#6B4FE0]"
              >
                {editingId ? 'Save Changes' : 'Create Transaction'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
