"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  CheckCircle,
  Star,
  Calendar,
  Lock,
  Home,
  Users,
  Building,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PremiumPromo } from "@/components/communities/PremiumPromo";

export function Sidebar() {
  const pathname = usePathname();
  const [communities] = useState([
    {
      id: "1",
      name: "BIC Beincom Việt Nam",
      logo: "BIC",
      isVerified: true,
      hasNFT: true,
    },
  ]);

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/communities", label: "Communities", icon: Users },
    { href: "/posts", label: "Posts", icon: Building },
  ];

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Navigation Links */}
      <div className="mb-8">
        <div className="space-y-2">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
                {isActive && (
                  <CheckCircle size={16} className="text-purple-600" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Communities Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your communities
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {communities.map((community) => (
            <div
              key={community.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {community.logo}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{community.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {community.hasNFT && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      NFT
                    </span>
                  )}
                  {community.isVerified && (
                    <CheckCircle size={14} className="text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Promo */}
      <div className="mb-6">
        <PremiumPromo />
      </div>

      {/* Airdrop Medals Panel */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Airdrop Medals
          </h3>
          <Star size={20} className="text-yellow-500" />
        </div>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">medals</div>
          <div className="text-lg font-semibold text-purple-600">0 $BIC</div>
        </div>
        <p className="text-sm text-gray-600 text-center mb-4">
          Complete all steps below to be eligible for the Airdrop.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              Activate BIC Wallet
            </span>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
              Activate
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-500">
              Install BIC Group app
            </span>
            <div className="flex items-center space-x-2">
              <Lock size={14} className="text-gray-400" />
              <button className="px-3 py-1 bg-gray-400 text-white text-xs rounded-lg cursor-not-allowed">
                Install
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium text-gray-500">
              Verify your account (KYC)
            </span>
            <div className="flex items-center space-x-2">
              <Lock size={14} className="text-gray-400" />
              <button className="px-3 py-1 bg-gray-400 text-white text-xs rounded-lg cursor-not-allowed">
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Panel */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Welcome to Beincom (BIC)
        </h3>
        <div className="space-y-3">
          <a
            href="#"
            className="block text-sm text-purple-600 hover:text-purple-700 transition-colors"
          >
            Quick Introductions and Guides
          </a>
          <a
            href="#"
            className="block text-sm text-purple-600 hover:text-purple-700 transition-colors"
          >
            Culture and Community Guidelines
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Beincom (BIC) Project - Building the future of social communities.
          </p>
        </div>
      </div>
    </aside>
  );
}
