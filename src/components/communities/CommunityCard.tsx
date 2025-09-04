"use client";
import { useState } from "react";
import { Check, Users, Clock } from "lucide-react";
import { Community } from "../../types/community.type";
import Image from "next/image";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  const [isJoined, setIsJoined] = useState(community.isJoined);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsJoined(!isJoined);
    } catch (error) {
      console.error("Failed to join/leave community:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Community Image */}
      <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        <Image
          src={community.image}
          alt={community.name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        {community.isVerified && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-blue-500 text-white p-1 rounded-full">
            <Check size={14} className="sm:w-4 sm:h-4" />
          </div>
        )}
        {community.badge && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-yellow-500 text-gray-900 px-2 py-1 rounded-lg text-xs font-semibold">
            {community.badge}
          </div>
        )}
      </div>

      {/* Community Info */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight">
            {community.name}
          </h3>
          {community.isVerified && (
            <Check size={16} className="text-blue-500 flex-shrink-0 mt-1" />
          )}
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {community.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users size={14} className="sm:w-4 sm:h-4" />
            <span>{community.memberCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span>{community.contentFrequency}</span>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          disabled={isLoading}
          className={`w-full py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            isJoined
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-current"></div>
              <span className="text-xs sm:text-sm">
                {isJoined ? "Leaving..." : "Joining..."}
              </span>
            </div>
          ) : isJoined ? (
            "Leave"
          ) : (
            "Join"
          )}
        </button>
      </div>
    </div>
  );
}
