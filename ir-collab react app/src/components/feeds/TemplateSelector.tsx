// src/components/feeds/TemplateSelector.tsx
"use client";

import { useState } from "react";
import {
  getAllTemplates,
  getTemplateByPostType,
  createBlankTemplate,
} from "../../data/unifiedPostData";
import { PostType } from "../../types/presentation";

export interface PresentationTemplate {
  id: string;
  title: string;
  description: string;
  slides: any[];
}

interface TemplateSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPostType?: PostType;
  onTemplateSelect: (template: PresentationTemplate) => void;
}

export const TemplateSelector = ({
  isVisible,
  onClose,
  selectedPostType,
  onTemplateSelect,
}: TemplateSelectorProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [previewTemplate, setPreviewTemplate] =
    useState<PresentationTemplate | null>(null);

  if (!isVisible) return null;

  // Get recommended template based on post type
  const recommendedTemplate = selectedPostType
    ? getTemplateByPostType(selectedPostType.id)
    : null;
  const allTemplates = getAllTemplates();

  const handleTemplatePreview = (template: PresentationTemplate) => {
    setPreviewTemplate(template);
    setSelectedTemplateId(template.id);
  };

  const handleUseTemplate = () => {
    if (previewTemplate) {
      onTemplateSelect(previewTemplate);
      onClose();
    }
  };

  const handleStartBlank = () => {
    const blankTemplate = createBlankTemplate(selectedPostType?.id);
    onTemplateSelect(blankTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex overflow-hidden">
        {/* Left Panel - Template List */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Choose Template
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {selectedPostType && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <span className="text-lg">{selectedPostType.icon}</span>
                <span>Templates for {selectedPostType.name}</span>
              </div>
            )}

            <button
              onClick={handleStartBlank}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all mb-4 shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">✏️</div>
                <div className="text-sm font-semibold">
                  Skip Templates & Start Editing
                </div>
                <div className="text-xs opacity-90">
                  Create a blank presentation and start writing
                </div>
              </div>
            </button>

            <button
              onClick={handleStartBlank}
              className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 transition-colors mb-4"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">➕</div>
                <div className="text-sm font-medium">
                  Or Start with Blank Template
                </div>
              </div>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Recommended Template */}
            {recommendedTemplate && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  🌟 Recommended
                </h3>
                <button
                  onClick={() => handleTemplatePreview(recommendedTemplate)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTemplateId === recommendedTemplate.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-lg font-medium mb-1">
                    {recommendedTemplate.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {recommendedTemplate.description}
                  </div>
                  <div className="text-xs text-blue-600">
                    {recommendedTemplate.slides.length} slides
                  </div>
                </button>
              </div>
            )}

            {/* All Templates with Selection Indicators */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              All Templates
            </h3>
            {allTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplatePreview(template)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left relative ${
                  selectedTemplateId === template.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {selectedTemplateId === template.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium mb-1">
                    {template.title}
                  </div>
                  {selectedTemplateId === template.id && (
                    <div className="text-xs text-blue-600 font-medium">
                      👁️ Previewing
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {template.description}
                </div>
                <div className="text-xs text-blue-600">
                  {template.slides.length} slides
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Template Preview */}
        <div className="flex-1 flex flex-col">
          {previewTemplate ? (
            <>
              {/* Preview Header - Enhanced with Instructions */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      📋 {previewTemplate.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {previewTemplate.description}
                    </p>
                    <p className="text-xs text-blue-600 bg-white px-2 py-1 rounded">
                      👇 Scroll to preview all slides • ✅ Click "Use Template"
                      when ready
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-2">
                      {previewTemplate.slides.length} slide
                      {previewTemplate.slides.length !== 1 ? "s" : ""}
                    </div>
                    <button
                      onClick={handleUseTemplate}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                    >
                      ✅ Use Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Slides Preview */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
                <div className="space-y-4">
                  {previewTemplate.slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="bg-white rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Slide {index + 1} • {slide.layout}
                        </span>
                        <div
                          className={`w-4 h-4 rounded bg-gradient-to-r ${
                            slide.theme?.includes("blue")
                              ? "from-blue-500 to-blue-700"
                              : slide.theme?.includes("purple")
                              ? "from-purple-500 to-purple-700"
                              : slide.theme?.includes("green")
                              ? "from-green-500 to-green-700"
                              : slide.theme?.includes("orange")
                              ? "from-orange-500 to-orange-700"
                              : slide.theme?.includes("teal")
                              ? "from-teal-500 to-teal-700"
                              : slide.theme?.includes("rose")
                              ? "from-rose-500 to-rose-700"
                              : "from-gray-500 to-gray-700"
                          }`}
                        ></div>
                      </div>

                      <div className="space-y-2">
                        {slide.content?.title && (
                          <h4 className="text-lg font-semibold text-gray-900">
                            {slide.content.title}
                          </h4>
                        )}

                        {slide.content?.text && (
                          <div className="text-sm text-gray-700 whitespace-pre-line">
                            {slide.content.text.length > 200
                              ? slide.content.text.substring(0, 200) + "..."
                              : slide.content.text}
                          </div>
                        )}

                        {slide.content?.quote && (
                          <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
                            <blockquote className="text-sm italic text-gray-700">
                              "{slide.content.quote}"
                            </blockquote>
                            {slide.content.author && (
                              <cite className="text-xs text-gray-500 mt-1 block">
                                — {slide.content.author}
                              </cite>
                            )}
                          </div>
                        )}

                        {slide.layout === "two-column" &&
                          slide.content?.text2 && (
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                              <div className="whitespace-pre-line">
                                {slide.content.text &&
                                  (slide.content.text.length > 100
                                    ? slide.content.text.substring(0, 100) +
                                      "..."
                                    : slide.content.text)}
                              </div>
                              <div className="whitespace-pre-line">
                                {slide.content.text2.length > 100
                                  ? slide.content.text2.substring(0, 100) +
                                    "..."
                                  : slide.content.text2}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Actions - Enhanced with selection info */}
              <div className="border-t border-gray-200 p-4 bg-blue-50">
                <div className="mb-2">
                  <div className="text-sm font-medium text-blue-900">
                    ✨ {previewTemplate.title}
                  </div>
                  <div className="text-xs text-blue-700">
                    {previewTemplate.slides.length} slides •{" "}
                    {previewTemplate.description}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleUseTemplate}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
                  >
                    ✅ Use This Template
                  </button>
                  <button
                    onClick={() => {
                      setPreviewTemplate(null);
                      setSelectedTemplateId(null);
                    }}
                    className="px-4 py-3 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    ← Browse More
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-medium mb-2">Select a Template</h3>
                <p className="text-gray-400">
                  Choose from our curated templates or start with a blank
                  presentation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
