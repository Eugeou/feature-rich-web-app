"use client";

import { Star } from "lucide-react";

export function PremiumPromo() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">
            Get Premium to boost your Medals
          </h3>
          <p className="text-purple-100 mb-4 text-sm">
            Your chance to boost your Medals and get special benefits from
            premium features.
          </p>
          <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm">
            Upgrade
          </button>
        </div>
        <div className="hidden md:block">
          <div className="text-4xl">🏆</div>
        </div>
      </div>
    </div>
  );
}
