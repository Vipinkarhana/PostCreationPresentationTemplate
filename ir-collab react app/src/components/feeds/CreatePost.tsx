"use client";

import React, { useState, useEffect, useRef } from "react";

interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [postContent, setPostContent] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("research");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  // Simplified Creation Mode State
  const [creationMode, setCreationMode] = useState<"post" | "presentation">(
    "post"
  );

  // Consolidated Presentation State
  const [showPresentationMode, setShowPresentationMode] = useState(false);
  const [presentationSlides, setPresentationSlides] = useState([
    {
      id: 1,
      title: "Introduction",
      content: "",
      layout: "title-content",
      background: "gradient-5",
      imageUrl: "",
      bulletPoints: [""],
      chartData: "",
      quoteText: "",
      quoteAuthor: "",
      leftContent: "",
      rightContent: "",
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // Unified slide index for both editing and viewing modes
  const [currentViewSlideIndex, setCurrentViewSlideIndex] = useState(0);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationMode, setPresentationMode] = useState("edit"); // edit, preview, full-screen
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [attachedPresentation, setAttachedPresentation] = useState<any>(null); // For storing complete presentation data
  const [showAutoTemplateSelector, setShowAutoTemplateSelector] =
    useState(false); // For auto-generated presentations
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false); // For background theme dropdown
  const [previewPresentation, setPreviewPresentation] = useState<any>(null); // For template preview without auto-attaching
  // Unified draft management - combines draft data and unsaved changes tracking
  const [draftState, setDraftState] = useState<{
    data: any;
    hasUnsavedChanges: boolean;
  }>({ data: null, hasUnsavedChanges: false });
  const [showFullScreenPresentation, setShowFullScreenPresentation] =
    useState(false); // For full screen presentation view
  const backgroundPickerRef = useRef<HTMLDivElement>(null);

  // Close background picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        backgroundPickerRef.current &&
        !backgroundPickerRef.current.contains(event.target as Node)
      ) {
        setShowBackgroundPicker(false);
      }
    };

    if (showBackgroundPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBackgroundPicker]);

  // Keyboard navigation for full screen presentation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showFullScreenPresentation || !attachedPresentation) return;

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          setCurrentViewSlideIndex((prev) =>
            prev > 0 ? prev - 1 : attachedPresentation.slides.length - 1
          );
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          event.preventDefault();
          setCurrentViewSlideIndex((prev) =>
            prev < attachedPresentation.slides.length - 1 ? prev + 1 : 0
          );
          break;
        case "Escape":
          event.preventDefault();
          setShowFullScreenPresentation(false);
          break;
        case "Home":
          event.preventDefault();
          setCurrentViewSlideIndex(0);
          break;
        case "End":
          event.preventDefault();
          setCurrentViewSlideIndex(attachedPresentation.slides.length - 1);
          break;
      }
    };

    if (showFullScreenPresentation) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showFullScreenPresentation, attachedPresentation]);

  const postTypes = [
    {
      id: "research",
      label: "Research Paper",
      icon: "🔬",
      color: "bg-slate-100 text-slate-800",
      theme: {
        gradient: "from-slate-600 via-slate-700 to-slate-800",
        accent: "border-slate-300 bg-slate-50",
        text: "text-slate-900",
      },
      description: "Share research findings, papers, or insights",
    },
    {
      id: "question",
      label: "Research Question",
      icon: "❓",
      color: "bg-indigo-100 text-indigo-800",
      theme: {
        gradient: "from-indigo-600 via-indigo-700 to-blue-800",
        accent: "border-indigo-300 bg-indigo-50",
        text: "text-indigo-900",
      },
      description: "Ask the community for help or advice",
    },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: "🤝",
      color: "bg-emerald-100 text-emerald-800",
      theme: {
        gradient: "from-emerald-600 via-teal-700 to-cyan-800",
        accent: "border-emerald-300 bg-emerald-50",
        text: "text-emerald-900",
      },
      description: "Find collaborators for your projects",
    },
    {
      id: "announcement",
      label: "Announcement",
      icon: "📢",
      color: "bg-amber-100 text-amber-800",
      theme: {
        gradient: "from-amber-600 via-orange-700 to-red-800",
        accent: "border-amber-300 bg-amber-50",
        text: "text-amber-900",
      },
      description: "Share news, events, or important updates",
    },
    {
      id: "discussion",
      label: "Discussion",
      icon: "💬",
      color: "bg-violet-100 text-violet-800",
      theme: {
        gradient: "from-violet-600 via-purple-700 to-indigo-800",
        accent: "border-violet-300 bg-violet-50",
        text: "text-violet-900",
      },
      description: "Start a conversation or debate",
      template: `💬 **Discussion Topic:** 

🤔 **Background:** 

❓ **Questions for discussion:** 
1. 
2. 
3. 

💭 **What do you think?**

#discussion #community`,
    },
    {
      id: "dataset",
      label: "Dataset Share",
      icon: "📊",
      color: "bg-sky-100 text-sky-800",
      theme: {
        gradient: "from-sky-600 via-blue-700 to-indigo-800",
        accent: "border-sky-300 bg-sky-50",
        text: "text-sky-900",
      },
      description: "Share or request research datasets",
      template: `📊 **Dataset Name:** 

📝 **Description:** 

🔢 **Size & Format:** 

📋 **Variables/Features:** 

🎯 **Use Cases:** 

📄 **License:** 

🔗 **Access Link:** 

#dataset #opendata`,
    },
    {
      id: "funding",
      label: "Funding Opportunity",
      icon: "💰",
      color: "bg-green-100 text-green-800",
      theme: {
        gradient: "from-green-600 via-emerald-700 to-teal-800",
        accent: "border-green-300 bg-green-50",
        text: "text-green-900",
      },
      description: "Share funding opportunities or grants",
      template: `💰 **Funding Opportunity:** 

🏢 **Organization:** 

💵 **Amount:** 

📅 **Deadline:** 

🎯 **Eligibility:** 

📝 **Focus Areas:** 

🔗 **Application Link:** 

#funding #grants #opportunity`,
    },
    {
      id: "publication",
      label: "Publication",
      icon: "📚",
      color: "bg-rose-100 text-rose-800",
      theme: {
        gradient: "from-rose-600 via-pink-700 to-purple-800",
        accent: "border-rose-300 bg-rose-50",
        text: "text-rose-900",
      },
      description: "Share published work or call for papers",
      template: `📚 **Publication:** 

✍️ **Authors:** 

📖 **Journal/Conference:** 

📅 **Publication Date:** 

📝 **Abstract:** 

🔍 **Keywords:** 

🔗 **DOI/Link:** 

#publication #research #academic`,
    },
  ];

  const popularTags = [
    "AI/ML",
    "Climate Science",
    "Biotechnology",
    "Data Science",
    "Quantum Computing",
    "Space Research",
    "Medical Research",
    "Engineering",
    "Psychology",
    "Neuroscience",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Computer Science",
    "Environmental Science",
    "Social Science",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    // Create a new post object
    const newPost = {
      id: Date.now().toString(),
      type: selectedPostType as
        | "project"
        | "case-study"
        | "research"
        | "discussion"
        | "milestone",
      author: {
        name: "You", // In a real app, this would come from authentication
        title: "Research Collaborator",
        avatar: "/api/placeholder/48/48",
        isOnline: true,
      },
      timestamp: "Just now",
      content: postContent,
      tags: selectedTags,
      presentation: attachedPresentation
        ? {
            title: attachedPresentation.title || presentationTitle,
            slides: attachedPresentation.slides || presentationSlides,
          }
        : undefined,
      metrics: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 1,
      },
      isLiked: false,
      isBookmarked: false,
    };

    // Call the callback to add the post to the feed
    if (onPostCreated) {
      onPostCreated(newPost);
    }

    console.log("Submitting post with data:", newPost);

    // Reset form
    setPostContent("");
    setSelectedTags([]);
    setCollaborators([]);
    setAttachedPresentation(null);
    setPresentationSlides([
      {
        id: 1,
        title: "Introduction",
        content: "",
        layout: "title-content",
        background: "gradient-1",
        imageUrl: "",
        bulletPoints: [""],
        chartData: "",
        quoteText: "",
        quoteAuthor: "",
        leftContent: "",
        rightContent: "",
      },
    ]);
    setPresentationTitle("");
    setShowPresentationMode(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Enhanced Presentation Mode Functions
  const slideLayouts = [
    {
      id: "title-content",
      name: "Title & Content",
      icon: "📝",
      description: "Simple title with content below",
    },
    {
      id: "split-view",
      name: "Split View",
      icon: "⚖️",
      description: "Left and right content sections",
    },
    {
      id: "full-image",
      name: "Full Image",
      icon: "🖼️",
      description: "Large image with overlay text",
    },
    {
      id: "bullet-points",
      name: "Bullet Points",
      icon: "📋",
      description: "Organized list format",
    },
    {
      id: "chart-focus",
      name: "Chart Focus",
      icon: "📊",
      description: "Data visualization layout",
    },
    {
      id: "quote-highlight",
      name: "Quote",
      icon: "💬",
      description: "Highlighted quote with attribution",
    },
  ];

  const backgroundThemes = [
    {
      id: "gradient-1",
      name: "Professional",
      class: "bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-900",
      textColor: "text-white",
    },
    {
      id: "gradient-2",
      name: "Creative",
      class: "bg-gradient-to-br from-violet-700 via-purple-800 to-indigo-900",
      textColor: "text-white",
    },
    {
      id: "gradient-3",
      name: "Academic",
      class: "bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-900",
      textColor: "text-white",
    },
    {
      id: "clean-white",
      name: "Clean",
      class: "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200",
      textColor: "text-gray-800",
    },
  ];

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: `Slide ${presentationSlides.length + 1}`,
      content: getAutoContentForLayout("title-content"), // Auto-fill with default content
      layout: "title-content",
      background: "gradient-5",
      imageUrl: "",
      bulletPoints: [""],
      chartData: "",
      quoteText: "",
      quoteAuthor: "",
      leftContent: "",
      rightContent: "",
    };
    setPresentationSlides([...presentationSlides, newSlide]);
    setCurrentSlideIndex(presentationSlides.length);
    setDraftState((prev) => ({ ...prev, hasUnsavedChanges: true }));
  };

  const updateSlide = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const updatedSlides = presentationSlides.map((slide, i) =>
      i === index ? { ...slide, [field]: value } : slide
    );
    setPresentationSlides(updatedSlides);
    setDraftState((prev) => ({ ...prev, hasUnsavedChanges: true }));

    // Auto-fill content for title-content layout
    if (
      field === "layout" &&
      value === "title-content" &&
      updatedSlides[index].content === ""
    ) {
      const autoContent = getAutoContentForLayout(value as string);
      if (autoContent) {
        updatedSlides[index].content = autoContent;
        setPresentationSlides(updatedSlides);
      }
    }
  };

  // Helper function to get auto content for different layouts
  const getAutoContentForLayout = (layoutType: string): string => {
    const autoContents: { [key: string]: string } = {
      "title-content":
        "Add your main content here...\n\n• Key point 1\n• Key point 2\n• Key point 3",
      "split-view": "",
      "bullet-points": "",
      "chart-focus": "",
      "quote-highlight": "",
      "full-image": "",
    };
    return autoContents[layoutType] || "";
  };

  // Clear presentation data when post type changes (prevent auto-attachment)
  const handlePostTypeChange = (newPostType: string) => {
    if (selectedPostType !== newPostType) {
      // Only clear if there are unsaved changes or if user confirms
      if (draftState.hasUnsavedChanges) {
        const shouldClear = confirm(
          "You have unsaved presentation changes. Clear them to switch post type?"
        );
        if (!shouldClear) return;
      }

      setSelectedPostType(newPostType);
      // Clear presentation data to prevent auto-attachment
      setAttachedPresentation(null);
      setPreviewPresentation(null);
      setDraftState({ data: null, hasUnsavedChanges: false });
      // Reset to default slide if in presentation mode
      if (showPresentationMode) {
        setPresentationSlides([
          {
            id: Date.now(),
            title: "Introduction",
            content: "",
            layout: "title-content",
            background: "gradient-5",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ]);
        setPresentationTitle("");
        setCurrentSlideIndex(0);
      }
    }
  };

  const removeSlide = (index: number) => {
    if (presentationSlides.length > 1) {
      const updatedSlides = presentationSlides.filter((_, i) => i !== index);
      setPresentationSlides(updatedSlides);
      if (currentSlideIndex >= updatedSlides.length) {
        setCurrentSlideIndex(updatedSlides.length - 1);
      }
      setDraftState((prev) => ({ ...prev, hasUnsavedChanges: true }));
    }
  };

  const duplicateSlide = (index: number) => {
    const slideToClone = { ...presentationSlides[index], id: Date.now() };
    const updatedSlides = [...presentationSlides];
    updatedSlides.splice(index + 1, 0, slideToClone);
    setPresentationSlides(updatedSlides);
    setCurrentSlideIndex(index + 1);
    setDraftState((prev) => ({ ...prev, hasUnsavedChanges: true }));
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    const updatedSlides = [...presentationSlides];
    const [movedSlide] = updatedSlides.splice(fromIndex, 1);
    updatedSlides.splice(toIndex, 0, movedSlide);
    setPresentationSlides(updatedSlides);
    setCurrentSlideIndex(toIndex);
  };

  const addBulletPoint = (slideIndex: number) => {
    const slide = presentationSlides[slideIndex];
    const newBulletPoints = [...slide.bulletPoints, ""];
    updateSlide(slideIndex, "bulletPoints", newBulletPoints);
  };

  const updateBulletPoint = (
    slideIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const slide = presentationSlides[slideIndex];
    const newBulletPoints = slide.bulletPoints.map((point, i) =>
      i === bulletIndex ? value : point
    );
    updateSlide(slideIndex, "bulletPoints", newBulletPoints);
  };

  const removeBulletPoint = (slideIndex: number, bulletIndex: number) => {
    const slide = presentationSlides[slideIndex];
    if (slide.bulletPoints.length > 1) {
      const newBulletPoints = slide.bulletPoints.filter(
        (_, i) => i !== bulletIndex
      );
      updateSlide(slideIndex, "bulletPoints", newBulletPoints);
    }
  };

  const generatePresentationContent = async () => {
    setIsGeneratingPost(true);

    // Create rich presentation data structure
    const presentationData = {
      title: presentationTitle,
      slides: presentationSlides,
      slideCount: presentationSlides.length,
      type: "presentation",
      postType: selectedPostType,
      tags: [...selectedTags, "presentation", "interactive"],
      createdAt: new Date().toISOString(),
      id: `presentation_${Date.now()}`,
    };

    // Attach the complete presentation to the post instead of converting to text
    setAttachedPresentation(presentationData);
    setCurrentSlideIndex(0); // Reset to first slide

    // Create a brief description for the text area
    let content = `🎭 **${presentationTitle}**\n\n`;
    content += `📊 ${presentationSlides.length} interactive slides | 🎨 Professional presentation | 🔬 ${selectedType?.label}\n\n`;
    content += `Click below to view the full interactive presentation with all slides, layouts, and themes.\n\n`;
    content += `#presentation #${selectedPostType} #interactive #research`;

    setPostContent(content);
    setShowPresentationMode(false);
    setIsGeneratingPost(false);

    // Show success message
    setTimeout(() => {
      alert("🎉 Presentation successfully attached to your post!");
    }, 500);
  };

  const renderSlidePreview = (slide: any, theme: any) => {
    const currentTheme =
      backgroundThemes.find((bg) => bg.id === slide.background) ||
      backgroundThemes[0];

    switch (slide.layout) {
      case "split-view":
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 ${currentTheme.textColor} shadow-lg flex`}
          >
            <div className="w-1/2 pr-2">
              <h3 className="text-sm font-bold mb-2">
                {slide.title || "Slide Title"}
              </h3>
              <div className="text-xs opacity-90">
                {slide.leftContent || "Left content..."}
              </div>
            </div>
            <div className="w-1/2 pl-2 border-l border-white/20">
              <div className="text-xs opacity-90">
                {slide.rightContent || "Right content..."}
              </div>
            </div>
          </div>
        );

      case "bullet-points":
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 ${currentTheme.textColor} shadow-lg`}
          >
            <h3 className="text-sm font-bold mb-2">
              {slide.title || "Slide Title"}
            </h3>
            <ul className="text-xs space-y-1">
              {slide.bulletPoints
                ?.filter((point: string) => point)
                .slice(0, 3)
                .map((point: string, i: number) => (
                  <li key={i} className="flex items-center opacity-90">
                    <span className="mr-2">•</span>
                    <span>{point}</span>
                  </li>
                )) || <li className="opacity-60">• Add bullet points...</li>}
            </ul>
          </div>
        );

      case "quote-highlight":
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 ${currentTheme.textColor} shadow-lg flex flex-col justify-center items-center`}
          >
            <div className="text-3xl mb-2 opacity-60">"</div>
            <div className="text-xs text-center italic mb-2">
              {slide.quoteText || "Add your quote here..."}
            </div>
            <div className="text-xs opacity-75">
              — {slide.quoteAuthor || "Author"}
            </div>
          </div>
        );

      case "chart-focus":
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 ${currentTheme.textColor} shadow-lg`}
          >
            <h3 className="text-sm font-bold mb-2">
              {slide.title || "Chart Title"}
            </h3>
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-white/30 rounded">
              <div className="text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs opacity-75">Chart/Data</div>
              </div>
            </div>
          </div>
        );

      case "full-image":
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 ${currentTheme.textColor} shadow-lg relative`}
          >
            <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <div className="text-xs opacity-75">Image Background</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-sm font-bold">
                {slide.title || "Image Title"}
              </h3>
            </div>
          </div>
        );

      default: // title-content
        return (
          <div
            className={`w-full h-40 rounded-xl ${currentTheme.class} p-4 flex flex-col justify-center items-center ${currentTheme.textColor} shadow-lg`}
          >
            <h3 className="text-sm font-bold mb-2 text-center">
              {slide.title || "Slide Title"}
            </h3>
            <div className="text-xs text-center opacity-90">
              {slide.content || "Slide content will appear here..."}
            </div>
          </div>
        );
    }
  };

  // Enhanced Large Slide Preview for Full-Screen Mode
  const renderLargeSlidePreview = (slide: any, theme: any) => {
    const currentTheme =
      backgroundThemes.find((bg) => bg.id === slide.background) ||
      backgroundThemes[0];

    switch (slide.layout) {
      case "split-view":
        return (
          <div
            className={`w-full h-full ${currentTheme.class} p-8 ${currentTheme.textColor} flex`}
          >
            <div className="w-1/2 pr-6">
              <h1 className="text-2xl font-bold mb-4">
                {slide.title || "Slide Title"}
              </h1>
              <div className="text-sm leading-relaxed opacity-95">
                {slide.leftContent ||
                  "Left content area for split view layout. This side can contain primary information, concepts, or data points."}
              </div>
            </div>
            <div className="w-1/2 pl-6 border-l-2 border-white/30">
              <div className="text-sm leading-relaxed opacity-95">
                {slide.rightContent ||
                  "Right content area for comparison, additional details, or supporting information."}
              </div>
            </div>
          </div>
        );

      case "bullet-points":
        return (
          <div
            className={`w-full h-full ${currentTheme.class} p-8 ${currentTheme.textColor}`}
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              {slide.title || "Slide Title"}
            </h1>
            <div className="max-w-3xl mx-auto">
              <ul className="text-sm space-y-3">
                {slide.bulletPoints
                  ?.filter((point: string) => point)
                  .map((point: string, i: number) => (
                    <li key={i} className="flex items-start opacity-95">
                      <span className="mr-3 text-base">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  )) || (
                  <li className="flex items-start opacity-75">
                    <span className="mr-3 text-base">•</span>
                    <span className="leading-relaxed">
                      Add your bullet points for a clear, organized presentation
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        );

      case "quote-highlight":
        return (
          <div
            className={`w-full h-full ${currentTheme.class} p-8 ${currentTheme.textColor} flex flex-col justify-center items-center text-center`}
          >
            <div className="text-4xl mb-4 opacity-60">"</div>
            <div className="text-lg italic leading-relaxed mb-4 max-w-2xl">
              {slide.quoteText ||
                "Your inspiring quote goes here. Make it impactful and memorable for your audience."}
            </div>
            <div className="text-base opacity-85 font-medium">
              — {slide.quoteAuthor || "Author Name"}
            </div>
          </div>
        );

      case "chart-focus":
        return (
          <div
            className={`w-full h-full ${currentTheme.class} p-8 ${currentTheme.textColor}`}
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              {slide.title || "Chart Title"}
            </h1>
            <div className="flex items-center justify-center h-2/3">
              <div className="w-3/4 h-3/4 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <div className="text-sm opacity-85 max-w-md">
                    {slide.chartData ||
                      "Your chart or data visualization will be displayed here"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "full-image":
        return (
          <div
            className={`w-full h-full ${currentTheme.class} relative overflow-hidden`}
          >
            <div className="absolute inset-6 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-3">🖼️</div>
                <div className="text-sm opacity-85">
                  {slide.imageUrl
                    ? "Image will be displayed here"
                    : "Add image URL for full background display"}
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-2xl font-bold">
                {slide.title || "Image Slide Title"}
              </h1>
            </div>
          </div>
        );

      default: // title-content
        return (
          <div
            className={`w-full h-full ${currentTheme.class} p-8 flex flex-col justify-center items-center ${currentTheme.textColor} text-center`}
          >
            <h1 className="text-3xl font-bold mb-6">
              {slide.title || "Slide Title"}
            </h1>
            <div className="text-sm leading-relaxed opacity-95 max-w-2xl">
              {slide.content ||
                "Your slide content goes here. Make it engaging and informative for your research presentation."}
            </div>
          </div>
        );
    }
  };

  // Auto-Generate Presentation Templates Based on Post Type
  const generateAutoPresentation = (postTypeId: string) => {
    const presentationTemplates: { [key: string]: any } = {
      research: {
        title: "🔬 Research Paper Presentation",
        slides: [
          {
            id: 1,
            title: "Research Overview",
            content:
              "🎯 Advancing knowledge through rigorous scientific inquiry\n\n📊 This presentation outlines our comprehensive research approach, methodology, and groundbreaking findings that contribute to the academic discourse in our field.\n\n✨ Key highlights include innovative methodologies, robust data analysis, and actionable insights for future research directions.",
            layout: "title-content",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "🎯 Research Objectives",
            content: "",
            layout: "bullet-points",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [
              "🔍 Primary Research Question: Define the core hypothesis and research problem",
              "📈 Measurable Objectives: Establish clear, quantifiable goals and success metrics",
              "🌟 Expected Impact: Anticipated contributions to field and practical applications",
              "📋 Scope & Limitations: Define boundaries and acknowledge research constraints",
              "🔗 Stakeholder Value: Benefits for academic community and industry partners",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "⚙️ Research Methodology",
            content: "",
            layout: "split-view",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "📋 **Research Design & Approach**\n\n🔬 Experimental Design\n   • Controlled variables and conditions\n   • Randomization and sampling strategy\n\n📊 Data Collection Methods\n   • Primary data sources and instruments\n   • Secondary data integration\n\n👥 Sample Population\n   • Target demographics and criteria\n   • Sample size calculation and justification",
            rightContent:
              "📈 **Analysis Framework**\n\n🧮 Statistical Methods\n   • Descriptive and inferential statistics\n   • Hypothesis testing procedures\n\n✅ Quality Assurance\n   • Validation and reliability measures\n   • Peer review and verification protocols\n\n🔍 Tools & Software\n   • Analysis platforms and instruments\n   • Data visualization techniques",
          },
          {
            id: 4,
            title: "📊 Key Research Findings",
            content: "",
            layout: "chart-focus",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData:
              "🎯 **Significant Results & Data Insights**\n\nPresent your breakthrough findings with compelling visualizations:\n\n📈 Statistical significance levels and confidence intervals\n📊 Comparative analysis and trend identification\n💡 Novel discoveries and unexpected outcomes\n🔍 Pattern recognition and correlation analysis\n\n*Interactive charts, graphs, and infographics showcase the depth and impact of your research contributions.*",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 5,
            title: "🌟 Conclusions & Future Impact",
            content: "",
            layout: "bullet-points",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [
              "🎯 **Key Conclusions**: Primary insights and validated hypotheses from research",
              "📚 **Academic Contribution**: Novel additions to existing body of knowledge",
              "🏭 **Practical Applications**: Real-world implementations and industry benefits",
              "🚀 **Future Research**: Recommended directions and emerging opportunities",
              "🤝 **Collaboration Potential**: Partnership opportunities and interdisciplinary connections",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      question: {
        title: "❓ Research Question & Community Inquiry",
        slides: [
          {
            id: 1,
            title: "🤔 Central Research Question",
            content: "",
            layout: "quote-highlight",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText:
              "What specific research challenge or intellectual curiosity drives your inquiry and requires the collective wisdom of our academic community?",
            quoteAuthor: "Your Research Focus",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "📚 Academic Context & Background",
            content: "",
            layout: "bullet-points",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [
              "🎓 **Current State of Knowledge**: Comprehensive review of existing literature and research",
              "🔍 **Research Gap Identification**: Specific areas lacking sufficient investigation or clarity",
              "💡 **Significance & Relevance**: Why this question matters to the broader academic community",
              "📖 **Foundational Studies**: Key research papers and theories that inform this inquiry",
              "🌐 **Interdisciplinary Connections**: How this question bridges multiple fields of study",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "🎯 Collaboration Objectives",
            content: "",
            layout: "split-view",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🧠 **Expertise & Guidance Sought**\n\n👨‍🔬 Domain Specialists\n   • Subject matter experts\n   • Methodological advisors\n\n🔧 Technical Support\n   • Statistical analysis guidance\n   • Software and tool recommendations\n\n🤝 Collaboration Opportunities\n   • Joint research partnerships\n   • Cross-institutional projects",
            rightContent:
              "🎯 **Expected Outcomes & Benefits**\n\n📋 Strategic Direction\n   • Clear research pathway\n   • Methodological clarity\n\n📚 Resource Access\n   • Literature recommendations\n   • Data source identification\n\n🌟 Network Expansion\n   • Expert connections\n   • Peer collaboration potential",
          },
          {
            id: 4,
            title: "📈 Current Progress & Next Steps",
            content: "",
            layout: "bullet-points",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [
              "✅ **Completed Investigations**: Research already conducted and preliminary insights gained",
              "🔬 **Methods Explored**: Analytical approaches attempted and their effectiveness",
              "📊 **Preliminary Findings**: Initial data patterns and emerging themes identified",
              "🚧 **Current Challenges**: Specific obstacles requiring community input and expertise",
              "🗺️ **Proposed Next Steps**: Planned research activities and timeline for completion",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      collaboration: {
        title: "🤝 Research Collaboration Opportunity",
        slides: [
          {
            id: 1,
            title: "🚀 Project Overview & Vision",
            content:
              "🌟 **Transformative Research Initiative**\n\nJoin our cutting-edge research project that pushes the boundaries of knowledge and creates meaningful impact in our field.\n\n🎯 **Mission**: Collaborative innovation through interdisciplinary expertise\n📈 **Impact**: Contributing to breakthrough discoveries and academic excellence\n🤝 **Partnership**: Building lasting professional relationships and expanding research networks",
            layout: "title-content",
            background: "gradient-2",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "🎯 Strategic Goals & Vision",
            content: "",
            layout: "bullet-points",
            background: "gradient-2",
            imageUrl: "",
            bulletPoints: [
              "🔬 **Primary Objectives**: Clearly defined research goals with measurable outcomes",
              "📊 **Key Deliverables**: Publications, datasets, reports, and innovative solutions",
              "⏰ **Project Timeline**: Structured phases with realistic milestones and deadlines",
              "📈 **Success Metrics**: Quantifiable indicators of progress and achievement",
              "🌍 **Global Impact**: Potential for international recognition and knowledge transfer",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "👥 Team Composition & Expertise",
            content: "",
            layout: "split-view",
            background: "gradient-2",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🧠 **Required Expertise & Skills**\n\n📊 Data Science & Analytics\n   • Statistical modeling and analysis\n   • Machine learning and AI applications\n\n🔬 Domain Knowledge\n   • Subject matter expertise\n   • Theoretical foundations\n\n💻 Technical Proficiency\n   • Programming and software tools\n   • Research methodologies",
            rightContent:
              "🎭 **Available Team Roles**\n\n👨‍🔬 Research Leadership\n   • Principal investigator\n   • Research coordinator\n\n📋 Research Support\n   • Research assistant positions\n   • Data collection specialist\n\n🔍 Analysis & Insights\n   • Statistical analyst\n   • Domain expert consultant",
          },
          {
            id: 4,
            title: "📋 Project Specifications & Benefits",
            content: "",
            layout: "bullet-points",
            background: "gradient-2",
            imageUrl: "",
            bulletPoints: [
              "📅 **Timeline & Commitment**: Flexible schedule with clear milestones over 6-12 months",
              "⏱️ **Time Investment**: 10-20 hours per week based on role and project phase",
              "🌐 **Work Arrangement**: Hybrid model with remote collaboration and occasional in-person meetings",
              "💰 **Compensation Package**: Competitive stipend, publication opportunities, and professional development",
              "🎓 **Academic Benefits**: Co-authorship opportunities, conference presentations, and networking",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 5,
            title: "✨ Join Our Research Community",
            content:
              "🚀 **Ready to Make an Impact?**\n\n📧 **Application Process**:\n• Send your CV and research interests\n• Brief cover letter explaining your motivation\n• Portfolio of relevant work (optional)\n\n⚡ **What Happens Next**:\n• Initial screening and compatibility assessment\n• Virtual interview with project team\n• Collaborative onboarding and role assignment\n\n🌟 **Transform Your Research Career** - Be part of groundbreaking discoveries that shape the future of our field!",
            layout: "title-content",
            background: "gradient-2",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      announcement: {
        title: "📢 Important Research Announcement",
        slides: [
          {
            id: 1,
            title: "🚨 Priority Research Update",
            content:
              "🌟 **Critical Information for Our Research Community**\n\nWe have important updates that will enhance our collaborative research environment and create new opportunities for academic excellence.\n\n📋 **Announcement Type**: [Select from: Policy Update, New Initiative, Event Notice, Deadline Alert, Resource Availability]\n\n🎯 **Community Impact**: This announcement affects our research productivity, collaboration opportunities, and academic success.",
            layout: "title-content",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "📋 Essential Information & Details",
            content: "",
            layout: "bullet-points",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [
              "🔍 **Announcement Summary**: Clear description of what is being communicated",
              "👥 **Target Audience**: Specific groups, departments, or entire community affected",
              "📅 **Effective Date**: When these changes or updates take place",
              "📖 **Additional Resources**: Links to detailed documentation and support materials",
              "📞 **Contact Information**: Direct channels for questions and clarifications",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "📊 Impact Assessment & Implications",
            content: "",
            layout: "split-view",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "⚡ **Immediate Implementation**\n\n🔄 **Process Changes**\n   • Updated workflows and procedures\n   • New system integrations\n   • Enhanced collaboration tools\n\n🚀 **New Opportunities**\n   • Expanded research capabilities\n   • Additional funding sources\n   • Enhanced networking events",
            rightContent:
              "🔮 **Long-term Strategic Benefits**\n\n🌍 **Community Growth**\n   • Strengthened research ecosystem\n   • Improved academic reputation\n   • Enhanced collaboration networks\n\n📈 **Expected Outcomes**\n   • Increased research productivity\n   • Better resource allocation\n   • Improved research quality",
          },
          {
            id: 4,
            title: "✅ Action Items & Next Steps",
            content: "",
            layout: "bullet-points",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [
              "🎯 **Required Actions**: Specific steps community members need to take",
              "⏰ **Important Deadlines**: Critical dates for responses, applications, or compliance",
              "🤝 **Participation Guidelines**: How to get involved and contribute to new initiatives",
              "📧 **Communication Channels**: Official contact methods for support and inquiries",
              "📚 **Training & Support**: Available resources to help with transition or implementation",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      discussion: {
        title: "💬 Research Discussion Forum",
        slides: [
          {
            id: 1,
            title: "🎯 Research Discussion Topic",
            content: "",
            layout: "quote-highlight",
            background: "gradient-5",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText:
              "💡 Let's explore cutting-edge research topics and foster collaborative knowledge exchange within our academic community!",
            quoteAuthor: "Community Research Forum",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "📚 Current Research Landscape",
            content: "",
            layout: "bullet-points",
            background: "gradient-5",
            imageUrl: "",
            bulletPoints: [
              "🔬 **Established Knowledge Base**: Foundational research and proven methodologies",
              "📊 **Recent Developments**: Latest findings and emerging trends in the field",
              "🏛️ **Academic Consensus**: Widely accepted theories and best practices",
              "📈 **Research Gaps**: Areas requiring further investigation and exploration",
              "🌟 **Innovation Opportunities**: Potential breakthroughs and novel approaches",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "⚖️ Academic Perspectives & Debates",
            content: "",
            layout: "split-view",
            background: "gradient-5",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🎭 **Perspective A: Traditional Approach**\n\n🔍 Core Arguments:\n   • Established methodological rigor\n   • Proven theoretical frameworks\n   • Historical precedent and validation\n\n📊 Supporting Evidence:\n   • Peer-reviewed publications\n   • Replicated studies\n   • Academic institution backing",
            rightContent:
              "🚀 **Perspective B: Innovative Methods**\n\n💡 Alternative Views:\n   • Novel technological approaches\n   • Interdisciplinary methodologies\n   • Emerging theoretical models\n\n🌟 Counter-Evidence:\n   • Recent breakthrough studies\n   • Cross-field applications\n   • Future-oriented research trends",
          },
          {
            id: 4,
            title: "🤔 Community Engagement Questions",
            content: "",
            layout: "bullet-points",
            background: "gradient-5",
            imageUrl: "",
            bulletPoints: [
              "💭 **Your Research Experience**: What insights have you gained from your current projects?",
              "🔍 **Methodological Challenges**: Which research obstacles have you encountered recently?",
              "🛠️ **Proven Solutions**: What innovative approaches have delivered successful outcomes?",
              "🔮 **Future Directions**: Which emerging research areas deserve our collective attention?",
              "🤝 **Collaboration Ideas**: How can we combine our expertise for greater impact?",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      dataset: {
        title: "📊 Dataset Presentation & Analysis",
        slides: [
          {
            id: 1,
            title: "🗃️ Dataset Overview & Introduction",
            content:
              "📈 **Comprehensive Research Dataset**\n\nPresenting a meticulously curated dataset designed to advance research capabilities and enable breakthrough discoveries in our field.\n\n🎯 **Dataset Purpose**: Supporting evidence-based research with high-quality, validated data\n📊 **Data Quality**: Rigorous collection standards, thorough validation, and comprehensive documentation\n🌟 **Research Value**: Enabling innovative analysis and contributing to academic excellence",
            layout: "title-content",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "📋 Technical Specifications & Structure",
            content: "",
            layout: "bullet-points",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [
              "💾 **Dataset Scale**: Total volume, number of records, and storage requirements",
              "📁 **File Organization**: Structured format (CSV, JSON, SQL, etc.) with clear naming conventions",
              "🔢 **Sample Size**: Statistical power calculations and representative sampling methodology",
              "📅 **Collection Period**: Temporal scope, data acquisition timeline, and update frequency",
              "🔐 **Data Integrity**: Quality assurance measures, validation protocols, and error handling",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "🧬 Variables & Data Architecture",
            content: "",
            layout: "split-view",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🎯 **Primary Variables & Features**\n\n📊 **Quantitative Measures**\n   • Continuous numerical data\n   • Statistical distributions\n   • Measurement precision\n\n🏷️ **Categorical Classifications**\n   • Nominal and ordinal variables\n   • Classification schemes\n   • Encoding methodologies",
            rightContent:
              "📝 **Metadata & Documentation**\n\n✅ **Quality Metrics**\n   • Completeness percentages\n   • Accuracy assessments\n   • Reliability measures\n\n🔧 **Processing Notes**\n   • Data cleaning procedures\n   • Transformation protocols\n   • Normalization standards",
          },
          {
            id: 4,
            title: "🔬 Research Applications & Use Cases",
            content: "",
            layout: "bullet-points",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [
              "🎯 **Recommended Research Areas**: Optimal applications for maximum analytical value",
              "📈 **Statistical Methods**: Suitable analysis techniques and methodological approaches",
              "❓ **Research Questions**: Potential investigations and hypothesis testing opportunities",
              "⚠️ **Known Limitations**: Data constraints, scope boundaries, and analytical considerations",
              "🔮 **Future Enhancements**: Planned expansions, updates, and additional data collection",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 5,
            title: "🔑 Access Protocols & Licensing",
            content:
              "🚀 **Ready to Advance Your Research?**\n\n📋 **Access Requirements**:\n• Institutional affiliation verification\n• Research proposal submission\n• Data use agreement completion\n\n📜 **Licensing Terms**:\n• Academic use permissions\n• Attribution requirements\n• Sharing and distribution policies\n\n📞 **Support & Resources**:\n• Technical documentation\n• Analysis tutorials and examples\n• Direct researcher support channels\n\n🌟 **Join the Research Community** - Unlock the potential of high-quality data for groundbreaking discoveries!",
            layout: "title-content",
            background: "research-blue",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      funding: {
        title: "💰 Research Funding Opportunity",
        slides: [
          {
            id: 1,
            title: "🌟 Exceptional Funding Opportunity",
            content:
              "💸 **Transform Your Research Vision into Reality**\n\nA prestigious funding opportunity designed to support innovative research projects and accelerate breakthrough discoveries in cutting-edge academic fields.\n\n🎯 **Funding Mission**: Empowering researchers to pursue ambitious projects with substantial financial support\n🏆 **Academic Excellence**: Investing in high-impact research with global significance\n🚀 **Innovation Focus**: Supporting novel approaches and groundbreaking methodologies",
            layout: "title-content",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "💎 Funding Package & Financial Details",
            content: "",
            layout: "bullet-points",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [
              "🏛️ **Funding Organization**: Prestigious institution or foundation with strong academic reputation",
              "💰 **Total Award Pool**: Substantial funding available across multiple research categories",
              "📊 **Individual Grant Range**: Competitive amounts from $50K to $500K+ based on project scope",
              "⏰ **Application Deadline**: Strategic timeline allowing thorough proposal development",
              "📅 **Award Timeline**: Multi-year funding with milestone-based disbursements",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "✅ Eligibility Criteria & Application Standards",
            content: "",
            layout: "split-view",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🎓 **Eligibility Requirements**\n\n📚 **Academic Qualifications**\n   • PhD or equivalent research degree\n   • Demonstrated research track record\n   • Institutional affiliation required\n\n🌍 **Geographic & Career Stage**\n   • International applications welcome\n   • Early to mid-career focus\n   • University or research institute based",
            rightContent:
              "📋 **Application Components**\n\n📝 **Required Documentation**\n   • Comprehensive research proposal\n   • Detailed budget justification\n   • CV and publication record\n\n🔍 **Review Process**\n   • Peer review by expert panels\n   • Multi-stage evaluation system\n   • Emphasis on innovation and impact",
          },
          {
            id: 4,
            title: "🔬 Priority Research Areas & Themes",
            content: "",
            layout: "bullet-points",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [
              "🧬 **Cutting-edge Research Fields**: Emerging disciplines with high innovation potential",
              "🛠️ **Supported Methodologies**: Advanced techniques, interdisciplinary approaches, and novel frameworks",
              "🤝 **Collaboration Requirements**: Team-based projects and international partnerships encouraged",
              "📈 **Expected Impact**: Breakthrough discoveries, policy influence, and societal benefit",
              "🌟 **Innovation Criteria**: Novel hypotheses, disruptive technologies, and paradigm shifts",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 5,
            title: "🚀 Application Process & Success Strategy",
            content:
              "🎯 **Ready to Secure Funding for Your Research?**\n\n📝 **Application Strategy**:\n• Develop compelling research narrative\n• Demonstrate clear innovation and impact\n• Build strong collaborative partnerships\n• Align with funding priorities\n\n⚡ **Next Steps**:\n• Download application guidelines\n• Schedule consultation with program officers\n• Begin early draft development\n• Connect with potential collaborators\n\n🏆 **Success Indicators**: Well-structured proposals with clear methodology, realistic timelines, and demonstrated expertise achieve 25-30% success rates\n\n💡 **Transform Your Research Career** - Join the ranks of funded researchers making breakthrough discoveries!",
            layout: "title-content",
            background: "gradient-3",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
      publication: {
        title: "📚 Publication Announcement",
        slides: [
          {
            id: 1,
            title: "🎉 New Research Publication",
            content:
              "📖 **Breakthrough Research Publication**\n\nWe are excited to announce the publication of our latest research contribution, representing months of rigorous investigation and analysis in our field.\n\n🏆 **Academic Achievement**: Peer-reviewed publication in a respected academic venue\n🌟 **Research Excellence**: Contributing valuable knowledge to the academic community\n🔬 **Scientific Impact**: Advancing understanding through evidence-based discoveries",
            layout: "title-content",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 2,
            title: "📋 Publication Details & Metadata",
            content: "",
            layout: "bullet-points",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [
              "📰 **Journal Information**: Prestigious academic venue with strong impact factor and reputation",
              "📅 **Publication Timeline**: Official publication date and online availability",
              "👥 **Research Team**: Complete author list with institutional affiliations and contributions",
              "🔗 **Digital Access**: DOI link, open access status, and institutional repository links",
              "📊 **Citation Format**: Standardized reference format for academic citation",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 3,
            title: "🔬 Research Highlights & Innovation",
            content: "",
            layout: "split-view",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent:
              "🎯 **Key Research Findings**\n\n💡 **Novel Discoveries**\n   • Breakthrough insights and innovations\n   • Unexpected research outcomes\n   • Paradigm-shifting conclusions\n\n📊 **Statistical Significance**\n   • Robust data analysis results\n   • Validated hypotheses\n   • Quantitative evidence support",
            rightContent:
              "🛠️ **Research Methodology**\n\n🔍 **Investigation Approach**\n   • Systematic research design\n   • Innovative analytical techniques\n   • Rigorous validation protocols\n\n📈 **Data Sources & Analysis**\n   • Comprehensive data collection\n   • Advanced statistical methods\n   • Cross-validation procedures",
          },
          {
            id: 4,
            title: "🌍 Impact & Academic Significance",
            content: "",
            layout: "bullet-points",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [
              "🎓 **Academic Contribution**: Advancing theoretical understanding and knowledge boundaries",
              "🏭 **Practical Applications**: Real-world implications and technology transfer potential",
              "📜 **Policy Implications**: Informing decision-making and regulatory frameworks",
              "🔮 **Future Research Directions**: Opening new avenues for investigation and collaboration",
              "🌟 **Community Impact**: Benefits to researchers, practitioners, and society at large",
            ],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
          {
            id: 5,
            title: "🔓 Access & Citation Information",
            content:
              "📖 **Ready to Explore Our Research?**\n\n🔗 **Access Options**:\n• Direct journal access via institutional subscription\n• Open access repository versions available\n• Preprint versions for immediate review\n• Author contact for research collaboration\n\n📝 **Citation Format**:\n• Complete bibliographic information provided\n• DOI for permanent digital reference\n• Formatted citations for major styles (APA, MLA, Chicago)\n\n🤝 **Research Collaboration**:\n• Contact authors for follow-up discussions\n• Data sharing agreements available\n• Methodology consultation opportunities\n\n🌟 **Join the Academic Conversation** - Build upon our findings and advance the field together!",
            layout: "title-content",
            background: "gradient-4",
            imageUrl: "",
            bulletPoints: [""],
            chartData: "",
            quoteText: "",
            quoteAuthor: "",
            leftContent: "",
            rightContent: "",
          },
        ],
      },
    };

    const template = presentationTemplates[postTypeId];
    if (template) {
      return template;
    }

    // Fallback template if postTypeId not found
    return {
      title: "Default Presentation",
      slides: [
        {
          id: 1,
          title: "Title Slide",
          content: "Add your content here",
          layout: "title-content",
          background: "gradient-1",
          imageUrl: "",
          bulletPoints: [""],
          chartData: "",
          quoteText: "",
          quoteAuthor: "",
          leftContent: "",
          rightContent: "",
        },
      ],
    };
  };

  const selectedType = postTypes.find((type) => type.id === selectedPostType);

  return (
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

        {/* Colorful Post Type Pills - Canva Style */}
        <div className="flex flex-wrap gap-2">
          {postTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handlePostTypeChange(type.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedPostType === type.id
                  ? `bg-gradient-to-r ${
                      type.theme.gradient
                    } text-white shadow-lg shadow-${
                      type.id === "research"
                        ? "blue"
                        : type.id === "question"
                        ? "purple"
                        : type.id === "collaboration"
                        ? "green"
                        : type.id === "announcement"
                        ? "orange"
                        : type.id === "discussion"
                        ? "indigo"
                        : type.id === "dataset"
                        ? "teal"
                        : type.id === "funding"
                        ? "yellow"
                        : "rose"
                    }-500/25`
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
              }`}
            >
              <span className="text-lg mr-2">{type.icon}</span>
              <span className="hidden sm:inline font-semibold">
                {type.label}
              </span>
              <span className="sm:hidden">{type.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Smart Creation Mode Selector - Industry Standard Progressive Disclosure */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700">
            Creation Mode:
          </h4>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>💡</span>
            <span>Choose the best way to express your research</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Quick Post Mode */}
          <button
            type="button"
            onClick={() => {
              setCreationMode("post");
              setShowPresentationMode(false);
              setShowPresentationMode(false);
              setShowAutoTemplateSelector(false);
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
              creationMode === "post"
                ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  creationMode === "post"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                }`}
              >
                📝
              </div>
              <div>
                <div className="font-semibold text-gray-900">Quick Post</div>
                <div className="text-xs text-gray-500">Simple & Fast</div>
              </div>
              {creationMode === "post" && (
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600">
              Share research updates, questions, or announcements quickly with
              rich text formatting.
            </div>
          </button>

          {/* Presentation Studio Mode */}
          <button
            type="button"
            onClick={() => {
              setCreationMode("presentation");
              setShowPresentationMode(true);
            }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
              creationMode === "presentation"
                ? "border-purple-500 bg-purple-50 shadow-md scale-[1.02]"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  creationMode === "presentation"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600"
                }`}
              >
                🎭
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Presentation Studio
                </div>
                <div className="text-xs text-gray-500">Professional Slides</div>
              </div>
              {creationMode === "presentation" && (
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600">
              Create professional presentations with multiple layouts, themes,
              and interactive elements.
            </div>
          </button>
        </div>

        {/* Mode Description */}
        <div className="mt-4 p-3 bg-white/60 rounded-lg border border-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-sm">
            {creationMode === "post" && (
              <>
                <span className="text-blue-500">📝</span>
                <span className="text-gray-700">
                  <strong>Quick Post Mode:</strong> Perfect for sharing quick
                  updates, asking questions, or making announcements.
                </span>
              </>
            )}
            {creationMode === "presentation" && (
              <>
                <span className="text-purple-500">🎭</span>
                <span className="text-gray-700">
                  <strong>Presentation Studio:</strong> Full-featured editor for
                  creating interactive research presentations.
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Content - Only show for Quick Post mode */}
      {creationMode === "post" && (
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit}>
            {/* Content Input */}
            <div className="mb-6">
              {/* Modern Presentation Access Buttons */}
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowPresentationMode(!showPresentationMode)}
                  className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  🎭 Create Presentation
                  <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    New
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    try {
                      const autoPresentation =
                        generateAutoPresentation(selectedPostType);
                      // Show preview instead of auto-attaching
                      setPreviewPresentation(autoPresentation);
                      setShowAutoTemplateSelector(true);
                    } catch (error) {
                      console.error(
                        "Error generating auto presentation:",
                        error
                      );
                    }
                  }}
                  className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${selectedType?.theme.gradient} text-white shadow-lg hover:shadow-xl`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  <span className="mr-1">{selectedType?.icon}</span>
                  Auto Template
                  <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    ⚡
                  </span>
                </button>
              </div>

              {/* Enhanced Presentation Builder */}
              {showPresentationMode && (
                <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                  {/* Advanced Header */}
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                          <span className="text-xl">🎭</span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            Presentation Studio
                          </h3>
                          <p className="text-white/90 text-sm">
                            Create professional research presentations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Mode Toggle */}
                        <div className="flex bg-white/20 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setPresentationMode("edit")}
                            className={`px-3 py-1 text-sm rounded transition-all ${
                              presentationMode === "edit"
                                ? "bg-white text-purple-600 font-medium"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setPresentationMode("preview")}
                            className={`px-3 py-1 text-sm rounded transition-all ${
                              presentationMode === "preview"
                                ? "bg-white text-purple-600 font-medium"
                                : "text-white/80 hover:text-white"
                            }`}
                          >
                            👀 Preview
                          </button>
                        </div>

                        {/* Draft/Changes Indicator */}
                        {draftState.hasUnsavedChanges && (
                          <span className="px-2 py-1 bg-orange-500/90 text-white text-xs rounded-full font-medium">
                            Unsaved Changes
                          </span>
                        )}
                        {draftState.data && (
                          <span className="px-2 py-1 bg-blue-500/90 text-white text-xs rounded-full font-medium">
                            Draft Available
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPresentationMode(false)}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center justify-center border border-white/20"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Compact Presentation Header */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          📝 Presentation Title
                        </label>
                        <input
                          type="text"
                          value={presentationTitle}
                          onChange={(e) => setPresentationTitle(e.target.value)}
                          placeholder="Enter your presentation title..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all font-medium"
                        />
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => duplicateSlide(currentSlideIndex)}
                          className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all"
                          title="Duplicate current slide"
                        >
                          📋
                        </button>
                        <button
                          type="button"
                          onClick={addSlide}
                          className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-all"
                          title="Add new slide"
                        >
                          ➕
                        </button>
                      </div>
                    </div>

                    {/* Compact Slide Navigator */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          🎬 Slides ({presentationSlides.length})
                        </label>
                      </div>

                      {/* Compact Slide Thumbnails */}
                      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
                        {presentationSlides.map((slide, index) => (
                          <div key={slide.id} className="relative group">
                            <button
                              onClick={() => setCurrentSlideIndex(index)}
                              className={`w-full aspect-video rounded-md border transition-all relative overflow-hidden ${
                                currentSlideIndex === index
                                  ? "border-purple-500 shadow-md ring-1 ring-purple-200"
                                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                              }`}
                              title={`Slide ${index + 1}: ${
                                slide.title || "Untitled"
                              }`}
                            >
                              <div className="absolute inset-0">
                                {renderSlidePreview(
                                  slide,
                                  backgroundThemes.find(
                                    (bg) => bg.id === slide.background
                                  )
                                )}
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-1 py-0.5 font-medium text-center">
                                {index + 1}
                              </div>
                            </button>

                            {/* Compact Slide Actions */}
                            {presentationSlides.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSlide(index);
                                }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                title="Delete slide"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Current Slide Editor */}
                    {presentationSlides[currentSlideIndex] &&
                      presentationMode === "edit" && (
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                          {/* Compact Slide Navigation */}
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                              <span>✏️</span>
                              <span>Editing Slide {currentSlideIndex + 1}</span>
                            </h4>

                            {/* Quick Slide Navigation */}
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setCurrentSlideIndex(
                                    Math.max(0, currentSlideIndex - 1)
                                  )
                                }
                                disabled={currentSlideIndex === 0}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                              >
                                ←
                              </button>

                              <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-1">
                                <span className="text-sm font-medium text-gray-700">
                                  {currentSlideIndex + 1} /{" "}
                                  {presentationSlides.length}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setCurrentSlideIndex(
                                    Math.min(
                                      presentationSlides.length - 1,
                                      currentSlideIndex + 1
                                    )
                                  )
                                }
                                disabled={
                                  currentSlideIndex ===
                                  presentationSlides.length - 1
                                }
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                              >
                                →
                              </button>

                              <button
                                type="button"
                                onClick={addSlide}
                                className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm font-bold"
                                title="Add new slide"
                              >
                                +
                              </button>

                              {/* Save/Draft Actions */}
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentData = {
                                      type: "presentation",
                                      data: {
                                        title: presentationTitle,
                                        slides: presentationSlides,
                                      },
                                      timestamp: new Date().toISOString(),
                                    };
                                    setDraftState({
                                      data: currentData,
                                      hasUnsavedChanges: false,
                                    });
                                    alert("Presentation saved as draft!");
                                  }}
                                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-all"
                                  title="Save current work as draft"
                                >
                                  💾 Draft
                                </button>

                                {draftState.data && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (
                                        confirm(
                                          "Load draft? Current unsaved changes will be lost."
                                        )
                                      ) {
                                        setPresentationTitle(
                                          draftState.data.data.title
                                        );
                                        setPresentationSlides(
                                          draftState.data.data.slides
                                        );
                                        setCurrentSlideIndex(0);
                                        setDraftState({
                                          data: draftState.data,
                                          hasUnsavedChanges: false,
                                        });
                                        alert("Draft loaded successfully!");
                                      }
                                    }}
                                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-all"
                                    title="Load saved draft"
                                  >
                                    📂 Load
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mb-4">
                            Layout:{" "}
                            {
                              slideLayouts.find(
                                (l) =>
                                  l.id ===
                                  presentationSlides[currentSlideIndex].layout
                              )?.name
                            }
                          </div>

                          {/* Slide Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              📝 Slide Title
                            </label>
                            <input
                              type="text"
                              value={
                                presentationSlides[currentSlideIndex].title
                              }
                              onChange={(e) =>
                                updateSlide(
                                  currentSlideIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all font-medium"
                              placeholder="Enter slide title..."
                            />
                          </div>

                          {/* Compact Design Controls */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Layout Selection - Compact Dropdown */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎨 Layout Style
                              </label>
                              <div className="relative">
                                <select
                                  value={
                                    presentationSlides[currentSlideIndex].layout
                                  }
                                  onChange={(e) =>
                                    updateSlide(
                                      currentSlideIndex,
                                      "layout",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all appearance-none bg-white cursor-pointer"
                                >
                                  {slideLayouts.map((layout) => (
                                    <option key={layout.id} value={layout.id}>
                                      {layout.icon} {layout.name} -{" "}
                                      {layout.description}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Background Theme - Compact with Visual Preview */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎨 Background Theme
                              </label>
                              <div
                                className="relative"
                                ref={backgroundPickerRef}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowBackgroundPicker(
                                      !showBackgroundPicker
                                    )
                                  }
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all bg-white cursor-pointer flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`w-8 h-6 rounded ${
                                        backgroundThemes.find(
                                          (t) =>
                                            t.id ===
                                            presentationSlides[
                                              currentSlideIndex
                                            ].background
                                        )?.class || "bg-gray-200"
                                      } shadow-inner`}
                                    ></div>
                                    <span className="text-sm font-medium">
                                      {backgroundThemes.find(
                                        (t) =>
                                          t.id ===
                                          presentationSlides[currentSlideIndex]
                                            .background
                                      )?.name || "Select Theme"}
                                    </span>
                                  </div>
                                  <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    ></path>
                                  </svg>
                                </button>

                                {showBackgroundPicker && (
                                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                                    <div className="p-2 grid grid-cols-2 gap-2">
                                      {backgroundThemes.map((theme) => (
                                        <button
                                          key={theme.id}
                                          type="button"
                                          onClick={() => {
                                            updateSlide(
                                              currentSlideIndex,
                                              "background",
                                              theme.id
                                            );
                                            setShowBackgroundPicker(false);
                                          }}
                                          className={`p-2 rounded-lg border transition-all hover:shadow-md ${
                                            presentationSlides[
                                              currentSlideIndex
                                            ].background === theme.id
                                              ? "border-purple-500 bg-purple-50"
                                              : "border-gray-200 hover:border-gray-300"
                                          }`}
                                        >
                                          <div
                                            className={`w-full h-8 rounded ${theme.class} mb-1 shadow-inner`}
                                          ></div>
                                          <div className="text-xs text-center font-medium truncate">
                                            {theme.name}
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Content Editor */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                              <span className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                <span>📝</span>
                                <span>Slide Content</span>
                              </span>
                            </div>

                            <div className="p-4 space-y-4 bg-white">
                              {/* Dynamic Content Editor Based on Layout */}
                              {presentationSlides[currentSlideIndex].layout ===
                                "split-view" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Left Content
                                    </label>
                                    <textarea
                                      value={
                                        presentationSlides[currentSlideIndex]
                                          .leftContent || ""
                                      }
                                      onChange={(e) =>
                                        updateSlide(
                                          currentSlideIndex,
                                          "leftContent",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter left side content..."
                                      rows={4}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Right Content
                                    </label>
                                    <textarea
                                      value={
                                        presentationSlides[currentSlideIndex]
                                          .rightContent || ""
                                      }
                                      onChange={(e) =>
                                        updateSlide(
                                          currentSlideIndex,
                                          "rightContent",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter right side content..."
                                      rows={4}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                                    />
                                  </div>
                                </div>
                              )}

                              {presentationSlides[currentSlideIndex].layout ===
                                "bullet-points" && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                      📋 Bullet Points
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        addBulletPoint(currentSlideIndex)
                                      }
                                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                      + Add Point
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {(
                                      presentationSlides[currentSlideIndex]
                                        .bulletPoints || [""]
                                    ).map((point, bulletIndex) => (
                                      <div
                                        key={bulletIndex}
                                        className="flex items-center space-x-2"
                                      >
                                        <span className="text-gray-400">•</span>
                                        <input
                                          type="text"
                                          value={point}
                                          onChange={(e) =>
                                            updateBulletPoint(
                                              currentSlideIndex,
                                              bulletIndex,
                                              e.target.value
                                            )
                                          }
                                          placeholder={`Bullet point ${
                                            bulletIndex + 1
                                          }...`}
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                                        />
                                        {presentationSlides[currentSlideIndex]
                                          .bulletPoints &&
                                          presentationSlides[currentSlideIndex]
                                            .bulletPoints.length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeBulletPoint(
                                                  currentSlideIndex,
                                                  bulletIndex
                                                )
                                              }
                                              className="w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                                            >
                                              ×
                                            </button>
                                          )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {presentationSlides[currentSlideIndex].layout ===
                                "quote-highlight" && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      💬 Quote Text
                                    </label>
                                    <textarea
                                      value={
                                        presentationSlides[currentSlideIndex]
                                          .quoteText || ""
                                      }
                                      onChange={(e) =>
                                        updateSlide(
                                          currentSlideIndex,
                                          "quoteText",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter the quote..."
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      👤 Quote Author
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        presentationSlides[currentSlideIndex]
                                          .quoteAuthor || ""
                                      }
                                      onChange={(e) =>
                                        updateSlide(
                                          currentSlideIndex,
                                          "quoteAuthor",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Author name..."
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                                    />
                                  </div>
                                </div>
                              )}

                              {presentationSlides[currentSlideIndex].layout ===
                                "full-image" && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🖼️ Image URL
                                  </label>
                                  <input
                                    type="text"
                                    value={
                                      presentationSlides[currentSlideIndex]
                                        .imageUrl || ""
                                    }
                                    onChange={(e) =>
                                      updateSlide(
                                        currentSlideIndex,
                                        "imageUrl",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter image URL..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                                  />
                                </div>
                              )}

                              {presentationSlides[currentSlideIndex].layout ===
                                "chart-focus" && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Chart/Data Description
                                  </label>
                                  <textarea
                                    value={
                                      presentationSlides[currentSlideIndex]
                                        .chartData || ""
                                    }
                                    onChange={(e) =>
                                      updateSlide(
                                        currentSlideIndex,
                                        "chartData",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Describe your chart or data visualization..."
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                                  />
                                </div>
                              )}

                              {presentationSlides[currentSlideIndex].layout ===
                                "title-content" && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📝 Slide Content
                                  </label>
                                  <textarea
                                    value={
                                      presentationSlides[currentSlideIndex]
                                        .content
                                    }
                                    onChange={(e) =>
                                      updateSlide(
                                        currentSlideIndex,
                                        "content",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter slide content..."
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all resize-none"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Enhanced Preview Mode */}
                    {presentationMode === "preview" && (
                      <div className="space-y-8">
                        <div className="text-center">
                          <h3 className="text-3xl font-bold text-gray-800 mb-3">
                            {presentationTitle || "Untitled Presentation"}
                          </h3>
                          <p className="text-lg text-gray-600">
                            Slide {currentSlideIndex + 1} of{" "}
                            {presentationSlides.length}
                          </p>
                        </div>

                        {/* Enhanced Full Preview - Much Larger */}
                        <div className="w-full max-w-6xl mx-auto">
                          <div className="aspect-video shadow-2xl rounded-3xl overflow-hidden border-4 border-gray-200">
                            <div className="w-full h-full">
                              {renderLargeSlidePreview(
                                presentationSlides[currentSlideIndex],
                                backgroundThemes.find(
                                  (bg) =>
                                    bg.id ===
                                    presentationSlides[currentSlideIndex]
                                      .background
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Preview Navigation */}
                        <div className="flex items-center justify-center space-x-6">
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentSlideIndex(
                                Math.max(0, currentSlideIndex - 1)
                              )
                            }
                            disabled={currentSlideIndex === 0}
                            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg font-medium"
                          >
                            ← Previous
                          </button>
                          <div className="flex items-center space-x-2">
                            <span className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg">
                              {currentSlideIndex + 1} /{" "}
                              {presentationSlides.length}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentSlideIndex(
                                Math.min(
                                  presentationSlides.length - 1,
                                  currentSlideIndex + 1
                                )
                              )
                            }
                            disabled={
                              currentSlideIndex ===
                              presentationSlides.length - 1
                            }
                            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg font-medium"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Generate Presentation */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={generatePresentationContent}
                          disabled={
                            !presentationTitle ||
                            presentationSlides.some((slide) => !slide.title) ||
                            isGeneratingPost
                          }
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2"
                        >
                          {isGeneratingPost ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <span>🎬</span>
                              <span>Create Presentation Post</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPresentationSlides([
                              {
                                id: 1,
                                title: "Introduction",
                                content: "",
                                layout: "title-content",
                                background: "gradient-1",
                                imageUrl: "",
                                bulletPoints: [""],
                                chartData: "",
                                quoteText: "",
                                quoteAuthor: "",
                                leftContent: "",
                                rightContent: "",
                              },
                            ]);
                            setPresentationTitle("");
                            setCurrentSlideIndex(0);
                          }}
                          className="px-4 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                        >
                          🗑️ Reset
                        </button>
                      </div>

                      {(!presentationTitle ||
                        presentationSlides.some((slide) => !slide.title)) && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-800">
                            ⚠️ Please add a presentation title and ensure all
                            slides have titles before generating.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Attached Presentation Preview */}
              {attachedPresentation && (
                <div className="mb-6 rounded-2xl overflow-hidden shadow-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                          <span className="text-xl">🎭</span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            Attached Presentation
                          </h3>
                          <p className="text-white/90 text-sm">
                            {attachedPresentation.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowFullScreenPresentation(true)}
                          className="px-3 py-1 bg-white/20 text-white text-sm rounded-lg font-medium hover:bg-white/30 transition-all flex items-center space-x-1"
                        >
                          <span>⛶</span>
                          <span>Full Screen</span>
                        </button>
                        <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-lg font-medium">
                          {attachedPresentation.slideCount} slides
                        </span>
                        <button
                          type="button"
                          onClick={() => setAttachedPresentation(null)}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center justify-center border border-white/20"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Main Slide Preview with Navigation */}
                    <div className="mb-6">
                      <div className="relative">
                        {/* Main Slide Display */}
                        <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                          {renderLargeSlidePreview(
                            attachedPresentation.slides[currentViewSlideIndex],
                            backgroundThemes.find(
                              (bg) =>
                                bg.id ===
                                attachedPresentation.slides[
                                  currentViewSlideIndex
                                ].background
                            )
                          )}
                        </div>

                        {/* Navigation Arrows */}
                        {attachedPresentation.slides.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentViewSlideIndex((prev) =>
                                  prev > 0
                                    ? prev - 1
                                    : attachedPresentation.slides.length - 1
                                )
                              }
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all"
                            >
                              ‹
                            </button>
                            <button
                              onClick={() =>
                                setCurrentViewSlideIndex((prev) =>
                                  prev < attachedPresentation.slides.length - 1
                                    ? prev + 1
                                    : 0
                                )
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all"
                            >
                              ›
                            </button>
                          </>
                        )}

                        {/* Slide Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-medium">
                          {currentViewSlideIndex + 1} /{" "}
                          {attachedPresentation.slides.length}
                        </div>
                      </div>
                    </div>

                    {/* Presentation Slide Thumbnails */}
                    <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
                      {attachedPresentation.slides.map(
                        (slide: any, index: number) => (
                          <div key={slide.id} className="relative group">
                            <button
                              onClick={() => setCurrentViewSlideIndex(index)}
                              className={`w-full aspect-video rounded-md overflow-hidden border-2 transition-all ${
                                index === currentViewSlideIndex
                                  ? "border-blue-500 shadow-lg scale-105"
                                  : "border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <div className="w-full h-full transform scale-50 origin-top-left">
                                {renderSlidePreview(
                                  slide,
                                  backgroundThemes.find(
                                    (bg) => bg.id === slide.background
                                  )
                                )}
                              </div>
                              <div
                                className={`absolute bottom-0.5 left-0.5 right-0.5 text-white text-xs rounded px-1 py-0.5 font-medium text-center ${
                                  index === currentViewSlideIndex
                                    ? "bg-blue-600"
                                    : "bg-black/60"
                                }`}
                              >
                                {index + 1}
                              </div>
                            </button>
                          </div>
                        )
                      )}
                    </div>

                    {/* Presentation Stats */}
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">
                        <span>📊</span>
                        <span>{attachedPresentation.slideCount} Slides</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-800 rounded-lg">
                        <span>🎨</span>
                        <span>Interactive Format</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg">
                        <span>🔬</span>
                        <span>{selectedType?.label}</span>
                      </div>
                    </div>

                    {/* Edit Presentation Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setPresentationTitle(attachedPresentation.title);
                          setPresentationSlides(attachedPresentation.slides);
                          setShowPresentationMode(true);
                          setAttachedPresentation(null);
                        }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                      >
                        <span>✏️</span>
                        <span>Edit Presentation</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={`Share your ${selectedType?.label.toLowerCase()}...`}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none transition-all duration-200 placeholder-gray-400"
                rows={postContent.length > 100 ? 8 : 5}
              />

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {postContent.length}/2000
                </span>
                <div className="flex items-center space-x-3">
                  {postContent && (
                    <button
                      type="button"
                      onClick={() => setPostContent("")}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tags and Collaborators - Always Visible */}
            <div className="mb-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
              {/* Compact Tags */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type-Specific Quick Fields */}
              {selectedPostType === "collaboration" && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Skills needed..."
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300"
                    />
                    <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300">
                      <option>Duration</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedPostType === "research" && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="DOI or paper link..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300"
                  />
                </div>
              )}

              {selectedPostType === "funding" && (
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Amount..."
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300"
                    />
                    <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-300">
                      <option>Type</option>
                      <option>Grant</option>
                      <option>Fellowship</option>
                      <option>Award</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Simplified Settings */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      defaultChecked
                      className="mr-1 scale-75"
                    />
                    <span className="text-gray-600">Public</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      className="mr-1 scale-75"
                    />
                    <span className="text-gray-600">Network</span>
                  </label>
                </div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1 scale-75" />
                  <span className="text-gray-600">Email notifications</span>
                </label>
              </div>
            </div>

            {/* Minimalist Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  title="Add image"
                >
                  <svg
                    className="w-4 h-4"
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
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all"
                  title="Attach file"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 00-2.828-2.828z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all"
                  title="Create poll"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Draft
                </button>
                <button
                  type="submit"
                  disabled={!postContent.trim()}
                  className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Template Preview Modal */}
      {showAutoTemplateSelector && previewPresentation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Preview Auto-Template</h3>
                  <p className="text-purple-100 mt-1">
                    {previewPresentation.title} •{" "}
                    {previewPresentation.slides.length} slides
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAutoTemplateSelector(false);
                    setPreviewPresentation(null);
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
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
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewPresentation.slides.map((slide: any, index: number) => (
                  <div
                    key={slide.id}
                    className="bg-gray-50 rounded-lg p-3 border"
                  >
                    <div className="aspect-video bg-white rounded border mb-2 relative overflow-hidden">
                      <div className="p-2 text-xs">
                        <div className="font-semibold text-gray-800 mb-1 truncate">
                          {slide.title}
                        </div>
                        <div className="text-gray-600 text-[10px] line-clamp-3">
                          {slide.content ||
                            slide.bulletPoints?.join(" • ") ||
                            slide.leftContent ||
                            "Content preview..."}
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center truncate">
                      {slide.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Choose an action for this template:
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      // Save as draft without attaching
                      setDraftState({
                        data: {
                          type: "presentation",
                          data: previewPresentation,
                          timestamp: new Date().toISOString(),
                        },
                        hasUnsavedChanges: false,
                      });
                      setShowAutoTemplateSelector(false);
                      setPreviewPresentation(null);
                      alert(
                        "Template saved as draft! You can access it later."
                      );
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                  >
                    💾 Save as Draft
                  </button>
                  <button
                    onClick={() => {
                      setShowAutoTemplateSelector(false);
                      setPreviewPresentation(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Use template and attach to presentation
                      setPresentationSlides(previewPresentation.slides);
                      setAttachedPresentation(previewPresentation);
                      setPresentationTitle(previewPresentation.title);
                      setCurrentViewSlideIndex(0); // Reset to first slide
                      setShowPresentationMode(true);
                      setShowAutoTemplateSelector(false);
                      setPreviewPresentation(null);
                      setDraftState((prev) => ({
                        ...prev,
                        hasUnsavedChanges: false,
                      }));
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all font-medium shadow-lg"
                  >
                    ✨ Use Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Presentation Modal */}
      {showFullScreenPresentation && attachedPresentation && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Full Screen Presentation Header */}
          <div className="bg-black/90 backdrop-blur-sm border-b border-gray-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-white font-bold text-lg">
                  {attachedPresentation.title}
                </h3>
                <div className="text-gray-300 text-sm">
                  Slide {currentViewSlideIndex + 1} of{" "}
                  {attachedPresentation.slides.length}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Navigation Controls */}
                <button
                  onClick={() =>
                    setCurrentViewSlideIndex((prev) =>
                      prev > 0
                        ? prev - 1
                        : attachedPresentation.slides.length - 1
                    )
                  }
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all flex items-center space-x-1"
                  disabled={attachedPresentation.slides.length <= 1}
                >
                  <span>‹</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={() =>
                    setCurrentViewSlideIndex((prev) =>
                      prev < attachedPresentation.slides.length - 1
                        ? prev + 1
                        : 0
                    )
                  }
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all flex items-center space-x-1"
                  disabled={attachedPresentation.slides.length <= 1}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => setShowFullScreenPresentation(false)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all flex items-center space-x-1"
                >
                  <span>✕</span>
                  <span className="hidden sm:inline">Exit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Screen Slide Content */}
          <div className="flex-1 relative">
            <div className="w-full h-full">
              {renderLargeSlidePreview(
                attachedPresentation.slides[currentViewSlideIndex],
                backgroundThemes.find(
                  (bg) =>
                    bg.id ===
                    attachedPresentation.slides[currentViewSlideIndex]
                      .background
                )
              )}
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm">
              Use ← → keys or buttons to navigate
            </div>

            {/* Click Areas for Navigation */}
            {attachedPresentation.slides.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentViewSlideIndex((prev) =>
                      prev > 0
                        ? prev - 1
                        : attachedPresentation.slides.length - 1
                    )
                  }
                  className="absolute left-0 top-0 w-1/4 h-full opacity-0 hover:opacity-10 bg-white transition-all"
                  aria-label="Previous slide"
                />
                <button
                  onClick={() =>
                    setCurrentViewSlideIndex((prev) =>
                      prev < attachedPresentation.slides.length - 1
                        ? prev + 1
                        : 0
                    )
                  }
                  className="absolute right-0 top-0 w-1/4 h-full opacity-0 hover:opacity-10 bg-white transition-all"
                  aria-label="Next slide"
                />
              </>
            )}
          </div>

          {/* Slide Thumbnails Strip */}
          <div className="bg-black/90 backdrop-blur-sm border-t border-gray-600 p-3">
            <div className="flex space-x-2 overflow-x-auto">
              {attachedPresentation.slides.map((slide: any, index: number) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentViewSlideIndex(index)}
                  className={`flex-shrink-0 w-20 h-12 rounded border-2 transition-all ${
                    index === currentViewSlideIndex
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-500 hover:border-blue-300"
                  }`}
                >
                  <div className="w-full h-full transform scale-25 origin-top-left overflow-hidden rounded">
                    {renderSlidePreview(
                      slide,
                      backgroundThemes.find((bg) => bg.id === slide.background)
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Presentation Studio Modal - Full Screen Overlay */}
      {showPresentationMode && creationMode === "presentation" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl">
            {/* Studio Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  🎭
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Presentation Studio
                  </h2>
                  <p className="text-gray-600">
                    Create professional research presentations
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                  <span>💡</span>
                  <span>Pro tip: Use templates for quick starts</span>
                </div>
                <button
                  onClick={() => {
                    setShowPresentationMode(false);
                    setCreationMode("post");
                  }}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Studio Content - Embed existing presentation mode */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full p-6">
                {/* Quick Action Bar */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowAutoTemplateSelector(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md"
                    >
                      <span>⚡</span>
                      <span>Use Template</span>
                    </button>
                    <button
                      onClick={() => setShowPresentationMode(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                    >
                      <span>🎨</span>
                      <span>Custom Design</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    {presentationSlides.length} slide
                    {presentationSlides.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Presentation Mode Content (existing functionality) */}
                {showPresentationMode && (
                  <div className="h-full">
                    {/* Include existing presentation editing interface here */}
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">🎭</div>
                      <h3 className="text-xl font-semibold mb-2">
                        Presentation Editor
                      </h3>
                      <p className="text-gray-600">
                        Custom presentation editing interface would be embedded
                        here
                      </p>
                    </div>
                  </div>
                )}

                {/* Templates Selection Prompt */}
                {!showPresentationMode && !showAutoTemplateSelector && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="text-8xl mb-6">🚀</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Let's Create Something Amazing
                      </h3>
                      <p className="text-gray-600 mb-8">
                        Choose how you'd like to start building your research
                        presentation. Use our smart templates for quick results,
                        or design from scratch for full control.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => setShowAutoTemplateSelector(true)}
                          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg"
                        >
                          <span>⚡</span>
                          <span>Smart Templates</span>
                        </button>
                        <button
                          onClick={() => setShowPresentationMode(true)}
                          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
                        >
                          <span>🎨</span>
                          <span>Custom Design</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Studio Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  💡 <strong>Tip:</strong> Your presentation will be
                  automatically saved to your post
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setShowPresentationMode(false);
                      setCreationMode("post");
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Generate post with presentation
                      const presentationData = {
                        title: presentationTitle,
                        slides: presentationSlides,
                      };
                      setAttachedPresentation(presentationData);
                      setShowPresentationMode(false);
                      setCreationMode("post");
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md"
                  >
                    Add to Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
