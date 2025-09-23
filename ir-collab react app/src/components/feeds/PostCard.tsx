"use client";

import React, { useState } from "react";

interface PostProps {
  post: {
    id: string;
    type: "project" | "case-study" | "research" | "discussion" | "milestone";
    author: {
      name: string;
      title: string;
      avatar: string;
      isOnline?: boolean;
    };
    timestamp: string;
    content: string;
    tags?: string[];
    attachments?: Array<{
      type: "image" | "file" | "link";
      name: string;
      url: string;
    }>;
    presentation?: {
      title: string;
      slides: Array<{
        id: number;
        title: string;
        content: string;
        layout: string;
        background: string;
        imageUrl?: string;
        bulletPoints?: string[];
        chartData?: string;
        quoteText?: string;
        quoteAuthor?: string;
        leftContent?: string;
        rightContent?: string;
      }>;
    };
    metrics: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
}

export default function PostCard({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showComments, setShowComments] = useState(false);

  const getPostTypeConfig = (type: string) => {
    const configs: Record<
      string,
      { icon: string; label: string; color: string }
    > = {
      project: {
        icon: "🔬",
        label: "Project",
        color: "bg-blue-100 text-blue-800",
      },
      "case-study": {
        icon: "📊",
        label: "Case Study",
        color: "bg-green-100 text-green-800",
      },
      research: {
        icon: "🧪",
        label: "Research",
        color: "bg-purple-100 text-purple-800",
      },
      discussion: {
        icon: "💭",
        label: "Discussion",
        color: "bg-orange-100 text-orange-800",
      },
      milestone: {
        icon: "🎯",
        label: "Milestone",
        color: "bg-red-100 text-red-800",
      },
    };
    return configs[type] || configs.discussion;
  };

  const typeConfig = getPostTypeConfig(post.type);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // API call would go here
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // API call would go here
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full"
              src={post.author.avatar}
              alt={post.author.name}
            />
            {post.author.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                {post.author.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}
              >
                <span className="mr-1">{typeConfig.icon}</span>
                {typeConfig.label}
              </span>
            </div>
            <p className="text-sm text-gray-600">{post.author.title}</p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        {/* More Options */}
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4 space-y-2">
          {post.attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex-shrink-0">
                {attachment.type === "image" && (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {attachment.type === "file" && (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                {attachment.type === "link" && (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 truncate">
                {attachment.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Presentation Display */}
      {post.presentation && (
        <div className="mb-4">
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-4 border border-indigo-200">
            {/* Presentation Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4v16a2 2 0 002 2h6a2 2 0 002-2V4M9 8h6m-6 4h6m-6 4h4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">
                  {post.presentation.title}
                </h3>
                <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white rounded-full text-xs font-medium">
                  🎭 {post.presentation.slides.length} slides
                </span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View Fullscreen
              </button>
            </div>

            {/* Presentation Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Slide Preview */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {post.presentation.slides[0]?.title || "Presentation Title"}
                  </h4>
                  <p className="text-gray-600 text-sm max-w-md">
                    {post.presentation.slides[0]?.content ||
                      "Presentation content preview..."}
                  </p>
                  {post.presentation.slides[0]?.bulletPoints &&
                    post.presentation.slides[0].bulletPoints.length > 0 && (
                      <div className="mt-3 text-left">
                        <ul className="text-sm text-gray-700 space-y-1">
                          {post.presentation.slides[0].bulletPoints
                            .slice(0, 3)
                            .map((point, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                                {point}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              {/* Slide Navigation */}
              <div className="p-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.presentation.slides.slice(0, 5).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === 0 ? "bg-indigo-500" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                  {post.presentation.slides.length > 5 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{post.presentation.slides.length - 5} more
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Slide 1 of {post.presentation.slides.length}</span>
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Metrics */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span>{post.metrics.likes} likes</span>
          <span>{post.metrics.comments} comments</span>
          <span>{post.metrics.views} views</span>
        </div>
        <span>{post.metrics.shares} shares</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked
                ? "text-red-600 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-medium">Like</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="font-medium">Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span className="font-medium">Share</span>
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked
              ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
              : "text-gray-400 hover:text-yellow-600 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-3">
            {/* Comment Input */}
            <div className="flex space-x-3">
              <img
                className="w-8 h-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="Your avatar"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-3 text-sm">
              <div className="flex space-x-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/api/placeholder/32/32"
                  alt="Commenter"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="font-medium text-gray-900">Dr. Jane Smith</p>
                    <p className="text-gray-700">
                      This is really interesting research! Have you considered
                      the implications for...
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <button className="hover:text-gray-700">Like</button>
                    <button className="hover:text-gray-700">Reply</button>
                    <span>2h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
