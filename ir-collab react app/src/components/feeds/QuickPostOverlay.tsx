import { PostType } from "../../types/presentation";

interface QuickPostOverlayProps {
  isVisible: boolean;
  selectedType: PostType | undefined;
  postContent: string;
  setPostContent: (content: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuickPostOverlay = ({
  isVisible,
  selectedType,
  postContent,
  setPostContent,
  selectedTags,
  setSelectedTags,
  onClose,
  onSubmit,
}: QuickPostOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Overlay Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                📝
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Quick Post</h3>
                <p className="text-sm text-gray-600">
                  {selectedType?.label} • Simple & Fast
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
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

        {/* Overlay Content */}
        <form onSubmit={onSubmit}>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`What would you like to share about your ${selectedType?.label.toLowerCase()}?`}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            {/* Tags and Options */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        const newTags = value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag);
                        setSelectedTags([...selectedTags, ...newTags]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTags(
                              selectedTags.filter((_, i) => i !== index)
                            )
                          }
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overlay Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              💡 Tip: Use markdown for rich formatting
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
