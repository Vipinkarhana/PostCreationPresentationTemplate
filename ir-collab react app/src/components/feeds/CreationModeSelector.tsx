interface CreationModeSelectorProps {
  onQuickPostClick: () => void;
  onPresentationStudioClick: () => void;
  onAutoTemplateClick: () => void;
}

export const CreationModeSelector = ({
  onQuickPostClick,
  onPresentationStudioClick,
  onAutoTemplateClick,
}: CreationModeSelectorProps) => {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Creation Mode:</h4>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>💡</span>
          <span>Choose the best way to express your research</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Post Mode */}
        <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50 text-left group hover:border-blue-300 hover:bg-blue-100 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              📝
            </div>
            <div>
              <div className="font-semibold text-gray-900">Quick Post</div>
              <div className="text-xs text-gray-500">Simple & Fast</div>
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-3">
            Share research updates, questions, or announcements quickly with
            rich text formatting.
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onQuickPostClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Start Writing
            </button>
            <button
              onClick={onAutoTemplateClick}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
            >
              Auto Template
            </button>
          </div>
        </div>

        {/* Presentation Studio Mode */}
        <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50 text-left group hover:border-purple-300 hover:bg-purple-100 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              🎨
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                Presentation Studio
              </div>
              <div className="text-xs text-gray-500">Professional Slides</div>
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-3">
            Create professional presentations with multiple layouts, themes, and
            interactive elements.
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onPresentationStudioClick}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
            >
              Create Slides
            </button>
            <button
              onClick={onAutoTemplateClick}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
