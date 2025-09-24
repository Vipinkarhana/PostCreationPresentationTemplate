"use client";

import { useState, useMemo } from "react";
import { CreatePostProps, PostType } from "../../types/presentation";
import { postTypes } from "../../data/unifiedPostData";
import { PostTypeSelector } from "./PostTypeSelector";
import { CreationModeSelector } from "./CreationModeSelector";
import { QuickPostOverlay } from "./QuickPostOverlay";

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  // Basic post state
  const [postContent, setPostContent] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("research");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Overlay visibility state
  const [showQuickPostOverlay, setShowQuickPostOverlay] = useState(false);
  const [showAutoTemplatePreview, setShowAutoTemplatePreview] = useState(false);
  const [showPresentationMode, setShowPresentationMode] = useState(false);

  // De-duplicate post types
  const uniquePostTypes = useMemo(() => {
    const seen = new Set<string>();
    return postTypes.filter((type: PostType) => {
      if (seen.has(type.id)) return false;
      seen.add(type.id);
      return true;
    });
  }, []);

  const selectedType = uniquePostTypes.find(
    (type: PostType) => type.id === selectedPostType
  );

  // Event handlers
  const handleQuickPostClick = () => {
    setShowQuickPostOverlay(true);
  };

  const handlePresentationStudioClick = () => {
    setShowPresentationMode(true);
  };

  const handleAutoTemplateClick = () => {
    if (selectedPostType) {
      setShowAutoTemplatePreview(true);
    }
  };

  const closeAllOverlays = () => {
    setShowQuickPostOverlay(false);
    setShowAutoTemplatePreview(false);
    setShowPresentationMode(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      type: selectedPostType,
      content: postContent,
      tags: selectedTags,
      timestamp: new Date().toISOString(),
      author: {
        name: "You",
        title: "Researcher",
        avatar: "/api/placeholder/48/48",
      },
    };

    onPostCreated?.(newPost);

    // Reset form
    setPostContent("");
    setSelectedTags([]);
    closeAllOverlays();
  };

  return (
    <>
      {/* Main Interface - Simplified */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6 hover:shadow-xl transition-all duration-300">
        {/* Modern Header with Subtle Gradient */}
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                src="/api/placeholder/48/48"
                alt="Your avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What's on your research mind?
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                Share with the global research community ✨
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <PostTypeSelector
            selectedPostType={selectedPostType}
            onPostTypeChange={setSelectedPostType}
            postTypes={uniquePostTypes}
          />
        </div>

        <CreationModeSelector
          onQuickPostClick={handleQuickPostClick}
          onPresentationStudioClick={handlePresentationStudioClick}
          onAutoTemplateClick={handleAutoTemplateClick}
        />
      </div>

      <QuickPostOverlay
        isVisible={showQuickPostOverlay}
        selectedType={selectedType}
        postContent={postContent}
        setPostContent={setPostContent}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        onClose={closeAllOverlays}
        onSubmit={handleSubmit}
      />

      {/* Auto Template Preview Overlay */}
      {showAutoTemplatePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Auto Template Preview
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedType?.label} • Smart Template
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeAllOverlays}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
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

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{selectedType?.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedType?.label} Template
                  </h4>
                  <p className="text-gray-600">
                    Pre-filled template with best practices for{" "}
                    {selectedType?.label.toLowerCase()}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-left">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                      {selectedType?.template}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                ✨ You can edit this template after selection
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={closeAllOverlays}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setPostContent(selectedType?.template || "");
                    setShowAutoTemplatePreview(false);
                    setShowQuickPostOverlay(true);
                  }}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  Use & Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TODO: Presentation Studio will be added as a separate component */}
      {showPresentationMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Presentation Studio</h2>
            <p className="text-gray-600 mb-6">
              Coming soon! This will be refactored into a separate component.
            </p>
            <button
              onClick={closeAllOverlays}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
