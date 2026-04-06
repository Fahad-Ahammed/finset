'use client';

import { usePathname } from 'next/navigation';
import { setRole } from '@/store/slices/roleSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectRole } from '@/store/selectors';

export default function Header() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const pathname = usePathname();
  const isDashboard = pathname === '/';

  return (
    <header className="flex items-start md:items-center gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      {/* Left — Greeting (dashboard only) */}
      {isDashboard && (
        <div className="w-full lg:w-auto lg:flex-1">
          <h1 className="text-lg font-semibold text-[#1C1C28] sm:text-xl lg:text-2xl">
            Welcome back, Adaline!
          </h1>
          <p className="mt-0.5 text-xs text-[#A2A2B5] sm:mt-1 sm:text-sm">
            It is the best time to manage your finances
          </p>
        </div>
      )}

      {/* Right — Actions & Profile */}
      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        {/* User profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Avatar */}
          <div className="relative h-8 w-8 shrink-0 overflow-hidden hidden sm:flex rounded-full bg-[#E5E5EF] sm:h-10 sm:w-10">
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

          {/* Divider */}
          <div className="h-8 hidden sm:block w-px bg-[#E5E5EF]" aria-hidden="true" />

          {/* admin toggle */}
          <div className="relative flex rounded-full border border-[#E5E5EF] bg-[#F4F2FF] p-0.5 text-xs sm:p-1 sm:text-sm">
            {/* sliding indicator */}
            <span
              className={`absolute top-0.5 bottom-0.5 w-[calc(50%-4px)] rounded-full bg-[#7B61FF] shadow-sm transition-all duration-300 ease-in-out sm:top-1 sm:bottom-1 ${
                role === 'admin' ? 'left-[calc(50%+2px)]' : 'left-0.5 sm:left-1'
              }`}
            />
            <button
              type="button"
              onClick={() => dispatch(setRole('viewer'))}
              className={`relative z-10 rounded-full px-3 py-1 font-medium cursor-pointer transition-colors duration-300 sm:px-4 sm:py-1.5 ${
                role === 'viewer'
                  ? 'text-white'
                  : 'text-[#A2A2B5] hover:text-[#1C1C28]'
              }`}
            >
              Viewer
            </button>
            <button
              type="button"
              onClick={() => dispatch(setRole('admin'))}
              className={`relative z-10 rounded-full px-3 py-1 font-medium cursor-pointer transition-colors duration-300 sm:px-4 sm:py-1.5 ${
                role === 'admin'
                  ? 'text-white'
                  : 'text-[#A2A2B5] hover:text-[#1C1C28]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
