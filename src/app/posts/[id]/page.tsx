"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { apiService } from "@/lib/api";
import { Comment } from "@/types/response.type";
import {
  ArrowLeft,
  MessageCircle,
  Heart,
  Share,
  Bookmark,
  Send,
  Loader2,
  Menu,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const queryClient = useQueryClient();

  const postId = parseInt(params.id as string);

  // Fetch post details
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => apiService.getPost(postId),
    enabled: !!postId && isAuthenticated,
  });

  // Fetch comments
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => apiService.getComments(postId),
    enabled: !!postId && isAuthenticated,
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (comment: Omit<Comment, "id">) =>
      apiService.addComment(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setCommentText("");
    },
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await addCommentMutation.mutateAsync({
        postId,
        name: user.name,
        email: user.email,
        body: commentText.trim(),
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || postError) {
    return null; // Will redirect
  }

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
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm sm:text-base">Back to Posts</span>
          </button>

          {post ? (
            <>
              {/* Post Content */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                {/* Post Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-lg">
                        {post.userId.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        User {post.userId}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {formatDate(new Date())}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                        Community {post.userId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                      <Bookmark size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share size={20} />
                    </button>
                  </div>
                </div>

                {/* Post Title and Body */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {post.title}
                </h1>
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                    {post.body}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors">
                      <MessageCircle size={20} />
                      <span className="text-sm sm:text-base">
                        {comments?.length || 0} Comments
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                      <Heart size={20} />
                      <span className="text-sm sm:text-base">Like</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Comments
                </h2>

                {/* Add Comment Form */}
                {user && (
                  <form onSubmit={handleAddComment} className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Write a comment..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                          disabled={isSubmitting}
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
                          <span className="text-sm text-gray-500">
                            Commenting as {user.name}
                          </span>
                          <button
                            type="submit"
                            disabled={!commentText.trim() || isSubmitting}
                            className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          >
                            {isSubmitting ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Send size={16} />
                            )}
                            <span>
                              {isSubmitting ? "Posting..." : "Post Comment"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Comments List */}
                <div className="space-y-4 sm:space-y-6">
                  {commentsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading comments...</p>
                    </div>
                  ) : commentsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600">
                        Error loading comments. Please try again.
                      </p>
                    </div>
                  ) : comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                      >
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-bold text-sm">
                            {comment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                {comment.name}
                              </h4>
                              <span className="text-xs sm:text-sm text-gray-500">
                                {formatDate(new Date())}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base">
                              {comment.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No comments yet. Be the first to comment!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Post not found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
