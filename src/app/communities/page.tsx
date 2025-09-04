"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CommunityCard } from "@/components/communities/CommunityCard";
import { useAuth } from "@/contexts/AuthContext";
import { CommunityFilter } from "@/components/communities/CommunityFilter";
import { useCommunities } from "@/hooks/useCommunities";
import { CommunitySearch } from "@/components/communities/CommunitySearch";
import { Menu } from "lucide-react";

export default function CommunitiesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { communities, isLoading: communitiesLoading } = useCommunities();

  // Redirect to auth if not authenticated
  if (!isLoading && !isAuthenticated) {
    window.location.href = "/auth";
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden fixed top-20 left-4 z-30 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={20} />
        </button>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Discover communities
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Find and join communities that match your interests
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <CommunitySearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for communities & groups"
              />
              <CommunityFilter
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Communities Grid */}
          <div className="space-y-4 sm:space-y-6">
            {communitiesLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading communities...</p>
              </div>
            ) : filteredCommunities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No communities found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
