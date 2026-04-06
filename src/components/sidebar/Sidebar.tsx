'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  PieChart,
  BarChart3,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { selectRole, selectUI } from '@/store/selectors';
import { setRole } from '@/store/slices/roleSlice';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Transactions', icon: ArrowLeftRight, href: '/transactions' },
  { label: 'Wallet', icon: Wallet, href: '/wallet' },
  { label: 'Goals', icon: Target, href: '/goals' },
  { label: 'Budget', icon: PieChart, href: '/budget' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Settings', icon: Sun, href: '/settings' },
];

const bottomItems = [
  { label: 'Help', icon: HelpCircle, href: '/help' },
  { label: 'Log out', icon: LogOut, href: '/logout' },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside
      className={`relative flex flex-col bg-[#F6F4FF] text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-62.5'
      } min-h-screen`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B61FF]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.4A6.4 6.4 0 1 1 10 3.6a6.4 6.4 0 0 1 0 12.8z"
              fill="white"
            />
            <path
              d="M10 6a1.2 1.2 0 0 0-1.2 1.2V10c0 .33.13.64.35.87l2.4 2.4a1.2 1.2 0 0 0 1.7-1.7L11.2 9.52V7.2A1.2 1.2 0 0 0 10 6z"
              fill="white"
            />
          </svg>
        </div>
        {!collapsed && (
          <span className="text-xl font-bold tracking-tight text-black">
            FinSet
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-18 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#2D2D3D] bg-[#1C1C28] text-gray-400 transition-colors hover:text-white"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Main nav */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#7B61FF] text-white'
                      : 'text-black hover:bg-[#7B61FF] hover:text-white'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-6">
        <ul className="space-y-1" role="list">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#7B61FF] hover:text-white ${
                  collapsed ? 'justify-center px-0' : ''
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark mode toggle */}
        <div
          className={`mt-6 flex items-center rounded-full bg-[#2D2D3D] p-1 ${
            collapsed ? 'mx-auto w-10 flex-col gap-1' : 'w-fit gap-0'
          }`}
        >
          <button
            onClick={() => setDarkMode(false)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              !darkMode
                ? 'bg-[#7B61FF] text-white'
                : 'text-[#A2A2B5] hover:text-white'
            }`}
            aria-label="Light mode"
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setDarkMode(true)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              darkMode
                ? 'bg-[#7B61FF] text-white'
                : 'text-[#A2A2B5] hover:text-white'
            }`}
            aria-label="Dark mode"
          >
            <Moon size={16} />
          </button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-1 text-sm">
          <button
            type="button"
            onClick={() => dispatch(setRole('viewer'))}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              role === 'viewer'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Viewer
          </button>
          <button
            type="button"
            onClick={() => dispatch(setRole('admin'))}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              role === 'admin'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </aside>
  );
}
