"use client";

import React, { useState } from "react";

interface PresentationData {
  title: string;
  slides: any[];
  slideCount: number;
  createdAt: string;
  theme: string;
  type: string;
}

interface PostWithPresentationComposerProps {
  isVisible: boolean;
  onClose: () => void;
  presentation: PresentationData | null;
  onPostCreated?: (post: any) => void;
}

export const PostWithPresentationComposer = ({
  isVisible,
  onClose,
  presentation,
  onPostCreated,
}: PostWithPresentationComposerProps) => {
  const [postContent, setPostContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [postType, setPostType] = useState<
    "project" | "case-study" | "research" | "discussion" | "milestone"
  >("research");
  const [isPosting, setIsPosting] = useState(false);

  const availableTags = [
    "presentation",
    "research",
    "project",
    "collaboration",
    "innovation",
    "methodology",
    "findings",
    "case-study",
    "analysis",
    "insights",
  ];

  const postTypes = [
    { id: "research", icon: "🔬", label: "Research" },
    { id: "project", icon: "🚀", label: "Project" },
    { id: "case-study", icon: "📊", label: "Case Study" },
    { id: "discussion", icon: "💭", label: "Discussion" },
    { id: "milestone", icon: "🎯", label: "Milestone" },
  ] as const;

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = async () => {
    if (!postContent.trim()) {
      alert("Please write something about your presentation!");
      return;
    }

    if (!presentation) {
      alert("No presentation data available!");
      return;
    }

    setIsPosting(true);

    try {
      const postData = {
        id: Date.now().toString(),
        type: postType,
        content: postContent,
        tags: [...selectedTags, "presentation", presentation.type],
        timestamp: new Date().toLocaleString(),
        author: {
          name: "You",
          title: "Researcher",
          avatar: "https://via.placeholder.com/48x48/e5e7eb/6b7280?text=U",
          isOnline: true,
        },
        presentation: {
          title: presentation.title,
          slides: presentation.slides,
        },
        metrics: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 1,
        },
        isLiked: false,
        isBookmarked: false,
      };

      onPostCreated?.(postData);

      // Reset form
      setPostContent("");
      setSelectedTags([]);
      onClose();

      alert("🎉 Post with presentation published successfully!");
    } catch (error) {
      alert("Failed to create post. Please try again.");
      console.error("Post creation error:", error);
    } finally {
      setIsPosting(false);
    }
  };

  if (!isVisible || !presentation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Create Post with Presentation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Presentation Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-lg p-2 min-w-0">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {presentation.title}
                </h3>
                <p className="text-gray-600 text-xs mt-1">
                  📊 {presentation.slideCount} slides • Created{" "}
                  {new Date(presentation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type
            </label>
            <div className="flex flex-wrap gap-2">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    postType === type.id
                      ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                      : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write about your presentation
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`Share insights from "${
                presentation?.title || "your presentation"
              }"...\n\n• What key findings did you discover?\n• What methodology did you use?\n• How can others collaborate or build on this work?\n• What challenges did you overcome?`}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              maxLength={500}
            />
            <div className="mt-1 text-right">
              <span
                className={`text-xs ${
                  postContent.length > 450 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {postContent.length}/500
              </span>
            </div>
          </div>

          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                Selected: {selectedTags.join(", ")}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              disabled={isPosting || !postContent.trim()}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                isPosting || !postContent.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <span>{isPosting ? "⏳" : "📤"}</span>
              <span>{isPosting ? "Posting..." : "Post with Presentation"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
