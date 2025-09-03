"use client";

import { categories } from "@/data";

interface CommunityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CommunityFilter({ value, onChange }: CommunityFilterProps) {
  return (
    <div className="flex items-center space-x-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
      >
        {categories?.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}
