"use client";

interface CommunityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { value: "all", label: "All categories" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "growth", label: "Personal Growth" },
  { value: "community", label: "Community Building" },
];

export function CommunityFilter({ value, onChange }: CommunityFilterProps) {
  return (
    <div className="flex items-center space-x-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}
