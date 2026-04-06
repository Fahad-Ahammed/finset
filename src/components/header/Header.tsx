"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      {/* Left — Greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1C1C28]">
          Welcome back, Adaline!
        </h1>
        <p className="mt-1 text-sm text-[#A2A2B5]">
          It is the best time to manage your finances
        </p>
      </div>

      {/* Right — Actions & Profile */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#1C1C28] transition-colors hover:bg-[#F0EDFF]"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notification bell */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1C1C28] transition-colors hover:bg-[#F0EDFF]"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#7B61FF] text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-[#E5E5EF]" aria-hidden="true" />

        {/* User profile */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E5E5EF]">
            <svg
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[#A2A2B5]"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Name & email */}
          <div className="hidden min-w-0 flex-col md:flex">
            <span className="truncate text-sm font-semibold text-[#1C1C28]">
              Adaline Lively
            </span>
            <span className="truncate text-xs text-[#A2A2B5]">
              adaline@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
