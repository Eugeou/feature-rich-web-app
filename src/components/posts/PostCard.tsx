'use client';

import Link from 'next/link';
import { MessageCircle, Heart, Share, Bookmark } from 'lucide-react';
import { Post } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  showActions?: boolean;
}

export function PostCard({ post, showActions = true }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {post.userId.toString().padStart(2, '0')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">User {post.userId}</h3>
            <p className="text-sm text-gray-500">{formatDate(new Date())}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Posted to</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Community {post.userId}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-700 leading-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>

      {/* Post Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
              <Heart size={18} />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Share size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
              <Bookmark size={18} />
            </button>
            <Link
              href={`/posts/${post.id}`}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
