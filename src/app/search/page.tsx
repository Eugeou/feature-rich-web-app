"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { PostCard } from "@/components/posts/PostCard";
import { apiService } from "@/lib/api";
import { Search, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Post } from "@/types/response.type";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"title" | "id">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const query = searchParams.get("q") || "";

  // Search posts
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["search", query, currentPage, sortBy, sortOrder],
    queryFn: () => apiService.searchPosts(query, currentPage, 10),
    enabled: !!query && isAuthenticated,
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth";
    }
  }, [isAuthenticated, authLoading]);

  const handleSort = (field: "title" | "id") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  if (authLoading) {
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
    return null; // Will redirect
  }

  const posts = searchResults || [];
  const totalPages = Math.ceil(posts.length / 10);

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
          {/* Search Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
              <Search className="text-purple-600 sm:w-6 sm:h-6" size={20} />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Search Results
              </h1>
            </div>

            {query && (
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span className="text-gray-600 text-sm sm:text-base">
                  Searching for:
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm sm:text-base">
                  {query}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">
                  • {posts.length} result{posts.length !== 1 ? "s" : ""} found
                </span>
              </div>
            )}
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
                    defaultValue={query}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newQuery = (e.target as HTMLInputElement).value;
                        if (newQuery.trim()) {
                          window.location.href = `/search?q=${encodeURIComponent(
                            newQuery.trim()
                          )}`;
                        }
                      }
                    }}
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

          {/* Search Results */}
          <div className="space-y-4 sm:space-y-6">
            {searchLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching...</p>
              </div>
            ) : searchError ? (
              <div className="text-center py-12">
                <p className="text-red-600">
                  Error performing search. Please try again.
                </p>
              </div>
            ) : !query ? (
              <div className="text-center py-12">
                <Search className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Enter a search term
                </h3>
                <p className="text-gray-600">
                  Use the search bar above to find posts
                </p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  No posts match your search for &quot;{query}&quot;. Try
                  different keywords or check your spelling.
                </p>
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

          {/* No Results Suggestions */}
          {query && posts.length === 0 && !searchLoading && (
            <div className="mt-8 bg-gray-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Search suggestions:
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                <li>• Make sure all words are spelled correctly</li>
                <li>• Try different keywords</li>
                <li>• Try more general keywords</li>
                <li>• Try fewer keywords</li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search page...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
