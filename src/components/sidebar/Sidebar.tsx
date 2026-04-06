'use client';

import { useState } from 'react';
import Link from 'next/link';
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
        className="absolute top-1/2 -translate-y-1/2 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#E0D9FF] cursor-pointer bg-[#7B61FF] text-white shadow-sm transition-colors hover:bg-[#6A4FE6]"
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
      </div>
    </aside>
  );
}
