// src/components/feeds/PresentationStudioOverlay.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { PostType, Slide, SlideLayout } from "../../types/presentation";
import { TemplateSelector, PresentationTemplate } from "./TemplateSelector";

interface PresentationStudioOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  selectedType: PostType | undefined;
  onPresentationCreated?: (presentation: any) => void;
  onAddToPost?: (presentation: any) => void;
}

export const PresentationStudioOverlay = ({
  isVisible,
  onClose,
  selectedType,
  onPresentationCreated,
  onAddToPost,
}: PresentationStudioOverlayProps) => {
  // Presentation state
  const [presentationTitle, setPresentationTitle] = useState("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedLayout, setSelectedLayout] =
    useState<SlideLayout>("title-content");
  const [selectedTheme, setSelectedTheme] = useState("gradient-blue");
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Inline editing state
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  // Publication state
  const [isPublishing, setIsPublishing] = useState(false);

  // Available layouts
  const layouts: { id: SlideLayout; name: string; icon: string }[] = [
    { id: "title-content", name: "Title & Content", icon: "📄" },
    { id: "two-column", name: "Two Column", icon: "📰" },
    { id: "image-focus", name: "Image Focus", icon: "🖼️" },
    { id: "full-image", name: "Full Image", icon: "🌅" },
    { id: "quote", name: "Quote", icon: "💬" },
    { id: "chart", name: "Chart", icon: "📊" },
  ];

  // Available themes
  const themes = [
    {
      id: "gradient-blue",
      name: "Ocean Blue",
      preview: "from-blue-600 to-blue-800",
    },
    {
      id: "gradient-purple",
      name: "Purple Rain",
      preview: "from-purple-600 to-purple-800",
    },
    {
      id: "gradient-green",
      name: "Forest Green",
      preview: "from-green-600 to-green-800",
    },
    {
      id: "gradient-orange",
      name: "Sunset Orange",
      preview: "from-orange-500 to-red-600",
    },
    {
      id: "gradient-teal",
      name: "Teal Wave",
      preview: "from-teal-500 to-cyan-600",
    },
    {
      id: "minimal-white",
      name: "Clean White",
      preview: "bg-white border-2 border-gray-200",
    },
    { id: "dark-mode", name: "Dark Mode", preview: "bg-gray-900 text-white" },
  ];

  // Function to get theme classes
  const getThemeClasses = (themeId: string) => {
    switch (themeId) {
      case "gradient-blue":
        return "bg-gradient-to-br from-blue-600 to-blue-800 text-white";
      case "gradient-purple":
        return "bg-gradient-to-br from-purple-600 to-purple-800 text-white";
      case "gradient-green":
        return "bg-gradient-to-br from-green-600 to-green-800 text-white";
      case "gradient-orange":
        return "bg-gradient-to-br from-orange-500 to-red-600 text-white";
      case "gradient-teal":
        return "bg-gradient-to-br from-teal-500 to-cyan-600 text-white";
      case "minimal-white":
        return "bg-white border-2 border-gray-200 text-gray-900";
      case "dark-mode":
        return "bg-gray-900 text-white";
      default:
        return "bg-white text-gray-900";
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template: PresentationTemplate) => {
    setSlides(template.slides);
    setPresentationTitle(template.title);
    setCurrentSlideIndex(0);
    setShowTemplateSelector(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            addSlide();
            break;
          case "d":
            e.preventDefault();
            duplicateSlide();
            break;
          case "s":
            e.preventDefault();
            handleExport();
            break;
          case "t":
            e.preventDefault();
            applyThemeToAllSlides(selectedTheme);
            break;
          case "ArrowLeft":
            e.preventDefault();
            goToPreviousSlide();
            break;
          case "ArrowRight":
            e.preventDefault();
            goToNextSlide();
            break;
        }
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, currentSlideIndex, slides.length]);

  // Initialize with template selector or default slide
  useEffect(() => {
    if (isVisible && slides.length === 0) {
      // Show template selector when first opened
      setShowTemplateSelector(true);
    }
  }, [isVisible, slides.length]);

  // Ensure there's always a default slide if template selector is closed without selection
  useEffect(() => {
    if (isVisible && !showTemplateSelector && slides.length === 0) {
      // Create a default slide if user closed template selector without selecting
      const defaultSlide: Slide = {
        id: "slide-1",
        layout: "title-content",
        content: {
          title: "Welcome to your presentation",
          text: "Click here to start editing your content...",
        },
        theme: "gradient-blue",
      };
      setSlides([defaultSlide]);
      setCurrentSlideIndex(0);
    }
  }, [isVisible, showTemplateSelector, slides.length]);

  // Fallback initialization for when user skips templates
  useEffect(() => {
    if (isVisible && slides.length === 0 && !showTemplateSelector) {
      const defaultSlide: Slide = {
        id: "slide-1",
        layout: "title-content",
        content: {
          title: selectedType?.name || "New Presentation",
          text: `Create your ${selectedType?.name.toLowerCase()} presentation...`,
        },
        theme: selectedType?.color
          ? `gradient-${selectedType.color}`
          : "gradient-blue",
      };
      setSlides([defaultSlide]);
      setPresentationTitle(selectedType?.name || "New Presentation");
    }
  }, [isVisible, selectedType, slides.length, showTemplateSelector]);

  // Auto-save functionality
  useEffect(() => {
    if (isAutoSaveEnabled && slides.length > 0) {
      const autoSaveTimer = setTimeout(() => {
        // Auto-save logic here - disabled logging to reduce console noise
        // console.log("Auto-saved presentation");
      }, 2000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [slides, presentationTitle, isAutoSaveEnabled]);

  const currentSlide = slides[currentSlideIndex];

  // Sync layout and theme selection with current slide
  useEffect(() => {
    if (currentSlide) {
      setSelectedLayout(currentSlide.layout);
      setSelectedTheme(currentSlide.theme || "gradient-blue");
    }
  }, [currentSlideIndex, currentSlide]);

  // Slide management functions
  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${slides.length + 1}`,
      layout: selectedLayout,
      content: {
        title: `Slide ${slides.length + 1}`,
        text: "Add your content here...",
      },
      theme: selectedTheme,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = (slideId: string) => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((slide) => slide.id !== slideId);
      setSlides(updatedSlides);
      if (currentSlideIndex >= updatedSlides.length) {
        setCurrentSlideIndex(updatedSlides.length - 1);
      }
    }
  };

  const updateSlideContent = (field: string, value: string) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex
        ? { ...slide, content: { ...(slide.content || {}), [field]: value } }
        : slide
    );
    setSlides(updatedSlides);
  };

  // Inline editing functions
  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue || "");
  };

  const finishEditing = () => {
    if (editingField) {
      updateSlideContent(editingField, tempValue);
      setEditingField(null);
      setTempValue("");
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue("");
  };

  // Handle Enter and Escape keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      finishEditing();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
    }
  };

  const changeSlideLayout = (layout: SlideLayout) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, layout } : slide
    );
    setSlides(updatedSlides);
    setSelectedLayout(layout);
  };

  const changeSlideTheme = (theme: string) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, theme } : slide
    );
    setSlides(updatedSlides);
    setSelectedTheme(theme);
  };

  const applyThemeToAllSlides = (theme: string) => {
    const updatedSlides = slides.map((slide) => ({
      ...slide,
      theme,
    }));
    setSlides(updatedSlides);
    setSelectedTheme(theme);
  };

  // Text formatting helper functions
  const handleTextFormat = (
    format: "bold" | "italic" | "bullet" | "number"
  ) => {
    const currentText = currentSlide?.content?.text || "";
    let formattedText = currentText;

    switch (format) {
      case "bold":
        formattedText =
          currentText + (currentText ? "\n\n" : "") + "**Bold text here**";
        break;
      case "italic":
        formattedText =
          currentText + (currentText ? "\n\n" : "") + "*Italic text here*";
        break;
      case "bullet":
        formattedText =
          currentText +
          (currentText ? "\n\n" : "") +
          "• Bullet point 1\n• Bullet point 2\n• Bullet point 3";
        break;
      case "number":
        formattedText =
          currentText +
          (currentText ? "\n\n" : "") +
          "1. First item\n2. Second item\n3. Third item";
        break;
    }

    updateSlideContent("text", formattedText);
  };

  // Text formatting renderer
  const renderFormattedText = (text: string) => {
    if (!text) return text;

    return text.split("\n").map((line, index) => {
      let formattedLine = line;

      // Bold formatting
      formattedLine = formattedLine.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      // Italic formatting
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

      return (
        <div
          key={index}
          className={line.startsWith("•") || line.match(/^\d+\./) ? "ml-4" : ""}
        >
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
        </div>
      );
    });
  };

  const handleExport = () => {
    const presentationData = {
      title: presentationTitle,
      type: selectedType?.id,
      slides: slides,
      createdAt: new Date().toISOString(),
    };

    // Create download link
    const dataStr = JSON.stringify(presentationData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${presentationTitle
      .replace(/\s+/g, "-")
      .toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePublish = async () => {
    // Validation before publishing
    if (!presentationTitle.trim()) {
      alert("Please add a title to your presentation before publishing.");
      return;
    }

    if (slides.length === 0) {
      alert("Please add at least one slide before publishing.");
      return;
    }

    // Check if slides have content
    const hasContent = slides.some(
      (slide) =>
        slide.content?.title?.trim() ||
        slide.content?.text?.trim() ||
        slide.content?.quote?.trim()
    );

    if (!hasContent) {
      const confirmEmpty = confirm(
        "Your presentation appears to be empty. Do you want to publish it anyway?"
      );
      if (!confirmEmpty) return;
    }

    setIsPublishing(true);

    try {
      const presentationData = {
        title: presentationTitle,
        type: selectedType?.id || "presentation",
        slides: slides,
        createdAt: new Date().toISOString(),
        slideCount: slides.length,
        postType: "presentation",
        content: `Created a presentation with ${slides.length} slides: "${presentationTitle}"`,
        author: {
          name: "Current User",
          title: "Content Creator",
          avatar: "https://via.placeholder.com/48x48/e5e7eb/6b7280?text=U",
          isOnline: true,
        },
        timestamp: "Just now",
        tags: ["presentation", selectedType?.id || "content"],
        presentation: {
          title: presentationTitle,
          slides: slides,
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

      onPresentationCreated?.(presentationData);

      // Show success message
      alert("🎉 Presentation published successfully to your feed!");
      onClose();
    } catch (error) {
      alert("Failed to publish presentation. Please try again.");
      console.error("Publish error:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddToPost = () => {
    // Validation before adding to post
    if (!presentationTitle.trim()) {
      alert("Please add a title to your presentation before adding to a post.");
      return;
    }

    if (slides.length === 0) {
      alert("Please add at least one slide before adding to a post.");
      return;
    }

    const presentationData = {
      title: presentationTitle,
      slides: slides,
      slideCount: slides.length,
      createdAt: new Date().toISOString(),
      theme: selectedTheme,
      type: selectedType?.id || "presentation",
    };

    onAddToPost?.(presentationData);
    onClose();
  };

  // Navigation functions
  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const duplicateSlide = () => {
    if (currentSlide) {
      const newSlide = {
        ...currentSlide,
        id: `slide-${Date.now()}`,
      };
      const newSlides = [...slides];
      newSlides.splice(currentSlideIndex + 1, 0, newSlide);
      setSlides(newSlides);
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{selectedType?.icon}</span>
              <div>
                <input
                  type="text"
                  value={presentationTitle}
                  onChange={(e) => setPresentationTitle(e.target.value)}
                  className={`text-lg font-semibold bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 ${
                    !presentationTitle.trim() ? "placeholder-red-400" : ""
                  }`}
                  placeholder="📝 Enter presentation title (required for publishing)"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {selectedType?.name} Presentation
                  </p>
                  {/* Publish Ready Indicator */}
                  <div className="flex items-center space-x-2">
                    {presentationTitle.trim() && slides.length > 0 ? (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <span>✅</span>
                        <span>Ready to publish</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-xs text-orange-600">
                        <span>⚠️</span>
                        <span>
                          {!presentationTitle.trim()
                            ? "Add title"
                            : "Add slides"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        slides.length > 0
                          ? ((currentSlideIndex + 1) / slides.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Progress: {currentSlideIndex + 1}/{slides.length} slides
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={isAutoSaveEnabled}
                onChange={(e) => setIsAutoSaveEnabled(e.target.checked)}
                className="rounded"
              />
              <span>Auto-save</span>
            </label>
            <button
              onClick={() => setShowTemplateSelector(true)}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs"
            >
              📋 Templates
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
            >
              💾 Export
            </button>

            {/* Publication Options */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
              <button
                onClick={handlePublish}
                disabled={
                  isPublishing ||
                  !presentationTitle.trim() ||
                  slides.length === 0
                }
                className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md flex items-center space-x-2 transition-all ${
                  isPublishing ||
                  !presentationTitle.trim() ||
                  slides.length === 0
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                }`}
                title={
                  isPublishing
                    ? "Publishing..."
                    : !presentationTitle.trim()
                    ? "Add a title to publish"
                    : slides.length === 0
                    ? "Add slides to publish"
                    : "Publish your presentation to the feed"
                }
              >
                <span>{isPublishing ? "⏳" : "🚀"}</span>
                <span>
                  {isPublishing ? "Publishing..." : "Publish to Feed"}
                </span>
              </button>
              <div className="text-xs text-gray-400">or</div>
              <button
                onClick={handleAddToPost}
                disabled={!presentationTitle.trim() || slides.length === 0}
                className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md flex items-center space-x-2 transition-all ${
                  !presentationTitle.trim() || slides.length === 0
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                }`}
                title={
                  !presentationTitle.trim()
                    ? "Add a title to attach to post"
                    : slides.length === 0
                    ? "Add slides to attach to post"
                    : "Add presentation as attachment to a new post"
                }
              >
                <span>📎</span>
                <span>Add to Post</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Enhanced Left Panel - Slide Management */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 space-y-2">
              <button
                onClick={addSlide}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                + Add Slide
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={duplicateSlide}
                  disabled={!currentSlide}
                  className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-colors disabled:opacity-50"
                  title="Duplicate Slide"
                >
                  📄 Duplicate
                </button>
                <button
                  onClick={goToPreviousSlide}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-colors disabled:opacity-50"
                  title="Previous Slide"
                >
                  ←
                </button>
                <button
                  onClick={goToNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-colors disabled:opacity-50"
                  title="Next Slide"
                >
                  →
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`relative p-3 rounded-lg cursor-pointer transition-colors group ${
                    index === currentSlideIndex
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-white border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Slide Thumbnail Preview */}
                  <div
                    className={`w-full h-16 mb-2 rounded text-xs p-2 flex items-center justify-center ${getThemeClasses(
                      slide.theme || "gradient-blue"
                    )}`}
                  >
                    <div className="text-center">
                      <div className="font-bold truncate">
                        {slide.content?.title || "Untitled"}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {slide.layout?.replace("-", " ") || "Layout"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium">
                        Slide {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">
                        {slide.layout?.replace("-", " ") || "Basic"}
                      </div>
                    </div>

                    {slides.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSlide(slide.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 text-sm p-1"
                        title="Delete Slide"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Panel - Slide Editor - Full height for inline editing */}
          <div className="flex-1 flex flex-col">
            {/* Slide Preview - Larger size for better inline editing */}
            <div className="flex-1 p-6 bg-gray-100 flex items-center justify-center min-h-[500px] relative">
              {/* Editing Instructions */}
              {!editingField && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-10">
                  💡 Click any text to edit
                </div>
              )}

              <div
                className={`w-full max-w-5xl aspect-video rounded-lg shadow-lg p-8 ${getThemeClasses(
                  currentSlide?.theme || "gradient-blue"
                )}`}
              >
                {currentSlide && (
                  <div className="h-full flex flex-col">
                    {/* Title-Content Layout - Inline Editable */}
                    {currentSlide.layout === "title-content" && (
                      <>
                        {/* Editable Title */}
                        {editingField === "title" ? (
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={handleKeyDown}
                            className="text-4xl font-bold mb-6 text-center bg-transparent border-2 border-white border-dashed rounded px-2 py-1 w-full outline-none"
                            placeholder="Click to add title..."
                            autoFocus
                          />
                        ) : (
                          <h1
                            onClick={() =>
                              startEditing(
                                "title",
                                currentSlide.content?.title || ""
                              )
                            }
                            className="text-4xl font-bold mb-6 text-center cursor-pointer hover:bg-white hover:bg-opacity-20 rounded px-2 py-1 transition-colors"
                            title="Click to edit title"
                          >
                            {currentSlide.content?.title ||
                              "Click to add title..."}
                          </h1>
                        )}

                        {/* Editable Content */}
                        {editingField === "text" ? (
                          <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={handleKeyDown}
                            className="flex-1 text-lg leading-relaxed bg-transparent border-2 border-white border-dashed rounded p-2 w-full outline-none resize-none"
                            placeholder="Click to add content..."
                            autoFocus
                          />
                        ) : (
                          <div
                            onClick={() =>
                              startEditing(
                                "text",
                                currentSlide.content?.text || ""
                              )
                            }
                            className="flex-1 text-lg leading-relaxed cursor-pointer hover:bg-white hover:bg-opacity-20 rounded p-2 transition-colors min-h-[100px]"
                            title="Click to edit content"
                          >
                            {currentSlide.content?.text ? (
                              renderFormattedText(currentSlide.content.text)
                            ) : (
                              <span className="text-white text-opacity-70">
                                Click to add content...
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Two-Column Layout - Inline Editable */}
                    {currentSlide.layout === "two-column" && (
                      <>
                        {/* Editable Title */}
                        {editingField === "title" ? (
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={handleKeyDown}
                            className="text-3xl font-bold mb-6 text-center bg-transparent border-2 border-white border-dashed rounded px-2 py-1 w-full outline-none"
                            placeholder="Click to add title..."
                            autoFocus
                          />
                        ) : (
                          <h2
                            onClick={() =>
                              startEditing(
                                "title",
                                currentSlide.content?.title || ""
                              )
                            }
                            className="text-3xl font-bold mb-6 text-center cursor-pointer hover:bg-white hover:bg-opacity-20 rounded px-2 py-1 transition-colors"
                            title="Click to edit title"
                          >
                            {currentSlide.content?.title ||
                              "Click to add title..."}
                          </h2>
                        )}

                        <div className="flex-1 grid grid-cols-2 gap-8">
                          {/* Left Column */}
                          {editingField === "text" ? (
                            <textarea
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              onBlur={finishEditing}
                              onKeyDown={handleKeyDown}
                              className="text-base bg-transparent border-2 border-white border-dashed rounded p-2 w-full outline-none resize-none h-full"
                              placeholder="Left column content..."
                              autoFocus
                            />
                          ) : (
                            <div
                              onClick={() =>
                                startEditing(
                                  "text",
                                  currentSlide.content?.text || ""
                                )
                              }
                              className="text-base cursor-pointer hover:bg-white hover:bg-opacity-20 rounded p-2 transition-colors min-h-[100px]"
                              title="Click to edit left column"
                            >
                              {currentSlide.content?.text ? (
                                renderFormattedText(currentSlide.content.text)
                              ) : (
                                <span className="text-white text-opacity-70">
                                  Click to add left column...
                                </span>
                              )}
                            </div>
                          )}

                          {/* Right Column */}
                          {editingField === "text2" ? (
                            <textarea
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              onBlur={finishEditing}
                              onKeyDown={handleKeyDown}
                              className="text-base bg-transparent border-2 border-white border-dashed rounded p-2 w-full outline-none resize-none h-full"
                              placeholder="Right column content..."
                              autoFocus
                            />
                          ) : (
                            <div
                              onClick={() =>
                                startEditing(
                                  "text2",
                                  currentSlide.content?.text2 || ""
                                )
                              }
                              className="text-base cursor-pointer hover:bg-white hover:bg-opacity-20 rounded p-2 transition-colors min-h-[100px]"
                              title="Click to edit right column"
                            >
                              {currentSlide.content?.text2 ? (
                                renderFormattedText(currentSlide.content.text2)
                              ) : (
                                <span className="text-white text-opacity-70">
                                  Click to add right column...
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Quote Layout - Inline Editable */}
                    {currentSlide.layout === "quote" && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        {/* Editable Quote */}
                        {editingField === "quote" ? (
                          <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={handleKeyDown}
                            className="text-3xl italic mb-6 bg-transparent border-2 border-white border-dashed rounded p-2 w-full outline-none resize-none text-center"
                            placeholder="Enter your quote..."
                            autoFocus
                          />
                        ) : (
                          <blockquote
                            onClick={() =>
                              startEditing(
                                "quote",
                                currentSlide.content?.quote || ""
                              )
                            }
                            className="text-3xl italic mb-6 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded p-2 transition-colors min-w-[300px]"
                            title="Click to edit quote"
                          >
                            "
                            {currentSlide.content?.quote ||
                              "Click to add quote..."}
                            "
                          </blockquote>
                        )}

                        {/* Editable Author */}
                        {editingField === "author" ? (
                          <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={handleKeyDown}
                            className="text-xl bg-transparent border-2 border-white border-dashed rounded px-2 py-1 outline-none text-center"
                            placeholder="Author name..."
                            autoFocus
                          />
                        ) : (
                          <cite
                            onClick={() =>
                              startEditing(
                                "author",
                                currentSlide.content?.author || ""
                              )
                            }
                            className="text-xl cursor-pointer hover:bg-white hover:bg-opacity-20 rounded px-2 py-1 transition-colors"
                            title="Click to edit author"
                          >
                            —{" "}
                            {currentSlide.content?.author ||
                              "Click to add author..."}
                          </cite>
                        )}
                      </div>
                    )}

                    {/* Image Focus Layout */}
                    {currentSlide.layout === "image-focus" && (
                      <>
                        <h2 className="text-3xl font-bold mb-6 text-center">
                          {currentSlide.content?.title || "Slide Title"}
                        </h2>
                        <div className="flex-1 grid grid-cols-2 gap-8 items-center">
                          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                            {currentSlide.content?.imageUrl ? (
                              <img
                                src={currentSlide.content.imageUrl}
                                alt="Slide"
                                className="max-w-full max-h-full object-contain rounded-lg"
                              />
                            ) : (
                              <span className="text-gray-500">🖼️ Image</span>
                            )}
                          </div>
                          <div className="text-base whitespace-pre-wrap">
                            {currentSlide.content?.text ||
                              "Add description text..."}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Full Image Layout */}
                    {currentSlide.layout === "full-image" && (
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                          {currentSlide.content?.imageUrl ? (
                            <img
                              src={currentSlide.content.imageUrl}
                              alt="Slide"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-gray-500 text-2xl">
                              🌅 Full Image
                            </span>
                          )}
                        </div>
                        {currentSlide.content?.title && (
                          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded">
                            <h2 className="text-2xl font-bold">
                              {currentSlide.content.title}
                            </h2>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Chart Layout */}
                    {currentSlide.layout === "chart" && (
                      <>
                        <h2 className="text-3xl font-bold mb-6 text-center">
                          {currentSlide.content?.title || "Chart Title"}
                        </h2>
                        <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-4">📊</div>
                            <div className="text-gray-600">
                              {currentSlide.content?.text ||
                                "Chart visualization will appear here"}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Design Controls with Scroll - Reduced width */}
          <div className="w-48 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* Layout Selection - Compact */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Layout</h3>
                <div className="grid grid-cols-2 gap-2">
                  {layouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => changeSlideLayout(layout.id)}
                      className={`p-3 rounded-lg border-2 transition-colors text-center ${
                        selectedLayout === layout.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">{layout.icon}</div>
                      <div className="text-xs">{layout.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <h3 className="font-semibold mb-3">Theme</h3>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center space-x-2">
                      <button
                        onClick={() => changeSlideTheme(theme.id)}
                        className={`flex-1 p-2 rounded-lg border-2 transition-colors flex items-center space-x-3 ${
                          selectedTheme === theme.id
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded ${theme.preview}`}
                        ></div>
                        <span className="text-sm">{theme.name}</span>
                      </button>
                      <button
                        onClick={() => applyThemeToAllSlides(theme.id)}
                        className="px-2 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium transition-colors"
                        title="Apply to all slides"
                      >
                        All
                      </button>
                    </div>
                  ))}

                  {/* Apply Current Theme to All Slides */}
                  {slides.length > 1 && (
                    <div className="pt-2 border-t border-gray-200">
                      <button
                        onClick={() => applyThemeToAllSlides(selectedTheme)}
                        className="w-full p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>🎨</span>
                        <span>
                          Apply "
                          {themes.find((t) => t.id === selectedTheme)?.name}" to
                          All Slides
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 text-sm">Shortcuts</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Add slide:</span>
                    <span className="font-mono">Ctrl+↵</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duplicate:</span>
                    <span className="font-mono">Ctrl+D</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Navigate:</span>
                    <span className="font-mono">Ctrl+← →</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Export:</span>
                    <span className="font-mono">Ctrl+S</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Apply theme to all:</span>
                    <span className="font-mono">Ctrl+T</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selector Overlay */}
      <TemplateSelector
        isVisible={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        selectedPostType={selectedType}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
};
