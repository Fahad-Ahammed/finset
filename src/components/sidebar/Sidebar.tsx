'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Menu,
  X,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Transactions', icon: ArrowLeftRight, href: '/transactions' },
  { label: 'Wallet', icon: Wallet, href: '/wallet' },
  { label: 'Goals', icon: Target, href: '/goals' },
  { label: 'Budget', icon: PieChart, href: '/budget' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

const bottomItems = [
  { label: 'Help', icon: HelpCircle, href: '/help' },
  { label: 'Log out', icon: LogOut, href: '/logout' },
];

const LogoIcon = () => (
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
);

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    if (mobileOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile / Tablet top bar (below 2xl: 1440px) ── */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#F6F4FF] px-4 py-3 shadow-sm lg:hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B61FF]">
            <LogoIcon />
          </div>
          <span className="text-xl font-bold tracking-tight text-black">
            FinSet
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-black transition-colors hover:bg-[#E0D9FF]"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown nav */}
        {mobileOpen && (
          <nav className="absolute top-full left-0 right-0 max-h-[calc(100vh-64px)] overflow-y-auto border-t border-[#E0D9FF] bg-[#F6F4FF] px-4 py-3 shadow-lg">
            <ul className="space-y-1" role="list">
              {navItems.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#7B61FF] text-white'
                          : 'text-black hover:bg-[#7B61FF] hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon size={20} className="shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-2 h-px bg-[#E0D9FF]" />

            <ul className="space-y-1" role="list">
              {bottomItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#7B61FF] hover:text-white"
                  >
                    <item.icon size={20} className="shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ── Desktop sidebar (2xl / 1440px+) ── */}
      <aside
        className={`relative hidden min-h-screen flex-col bg-[#F6F4FF] text-white transition-all duration-300 lg:flex ${
          collapsed ? 'w-20' : 'w-62.5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7B61FF]">
            <LogoIcon />
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
          className="absolute top-1/2 -right-3 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E0D9FF] bg-[#7B61FF] text-white shadow-sm transition-colors hover:bg-[#6A4FE6]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Main nav */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
    </>
  );
}
