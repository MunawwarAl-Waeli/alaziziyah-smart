"use client";

import { Search, X, Loader2 } from "lucide-react";

interface ServiceSearchProps {
  value: string;
  onChange: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isSearching?: boolean;
}

export function ServiceSearch({ 
  value, 
  onChange, 
  onClear,
  placeholder = "ابحث عن خدمة...",
  isSearching = false
}: ServiceSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full py-4 px-6 pr-14 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-base"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {isSearching ? (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </div>
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute left-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}