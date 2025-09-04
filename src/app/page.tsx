"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { PostCard } from "@/components/posts/PostCard";
import { apiService } from "@/lib/api";
import { Post } from "@/types/response.type";
import {
  Search,
  Filter,
  Edit,
  FileText,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"title" | "id">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"explore" | "following" | "saved">(
    "following"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch posts with pagination and sorting
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts", currentPage, sortBy, sortOrder],
    queryFn: () =>
      apiService.getPostsWithPagination(currentPage, 10, sortBy, sortOrder),
    enabled: isAuthenticated,
  });

  // Search posts
  const {
    data: searchResults,
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["search", searchQuery, currentPage],
    queryFn: () => apiService.searchPosts(searchQuery, currentPage, 10),
    enabled: false, // Don't auto-fetch, only on search
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetchSearch();
    }
  };

  const handleSort = (field: "title" | "id") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/auth";
    }
  }, [isAuthenticated, isLoading]);

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

  if (!isAuthenticated) {
    return null;
  }

  const posts = searchQuery.trim()
    ? searchResults || []
    : postsData?.posts || [];
  const totalPages = searchQuery.trim()
    ? Math.ceil((searchResults?.length || 0) / 10)
    : postsData?.totalPages || 1;

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
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Share new ideas with your community!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all">
              <Edit className="text-purple-600" size={20} />
              <span className="font-medium text-gray-900 text-sm sm:text-base">
                Quick Post
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all">
              <FileText className="text-purple-600" size={20} />
              <span className="font-medium text-gray-900 text-sm sm:text-base">
                Write Article
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
              <Grid3X3 className="text-purple-600" size={20} />
              <span className="font-medium text-gray-900 text-sm sm:text-base">
                Create Series
              </span>
            </button>
          </div>

          {/* Airdrop Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  AIRDROP $BIC 5/60
                </h2>
                <p className="text-purple-100 mb-4 text-sm sm:text-base">
                  3 CONDITIONS FOR PRIOR CLAIMERS
                </p>
                <button className="bg-yellow-500 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm sm:text-base">
                  COMPLETE NOW
                </button>
              </div>
              <div className="hidden sm:block">
                <div className="text-4xl sm:text-6xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              {(["explore", "following", "saved"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                    activeTab === tab
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value as "title" | "id")}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="id">Sort by ID</option>
                  <option value="title">Sort by Title</option>
                </select>

                <button
                  onClick={() => handleSort(sortBy)}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="space-y-4 sm:space-y-6">
            {postsLoading || searchLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading posts...</p>
              </div>
            ) : postsError ? (
              <div className="text-center py-12">
                <p className="text-red-600">
                  Error loading posts. Please try again.
                </p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No posts found.</p>
              </div>
            ) : (
              <>
                {posts.map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="px-4 py-2 text-gray-700 text-sm sm:text-base">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
