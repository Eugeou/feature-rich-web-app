"use client";

import { Search } from "lucide-react";

interface CommunitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CommunitySearch({
  value,
  onChange,
  placeholder,
}: CommunitySearchProps) {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder={placeholder || "Search communities..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>
    </div>
  );
}
