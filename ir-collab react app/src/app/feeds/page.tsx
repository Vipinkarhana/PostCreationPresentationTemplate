"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CreatePost from "@/components/feeds/CreatePost";
import FeedControls from "@/components/feeds/FeedControls";
import PostCard from "@/components/feeds/PostCard";

// Sample data - this would come from an API in a real application
const samplePosts = [
  {
    id: "0",
    type: "research" as const,
    author: {
      name: "Dr. Emily Zhang",
      title: "Data Science Researcher at MIT",
      avatar: "/api/placeholder/48/48",
      isOnline: true,
    },
    timestamp: "30 minutes ago",
    content:
      "Just completed my research on machine learning applications in healthcare diagnostics. Created an interactive presentation to showcase our findings and methodology. The results show 94% accuracy in early disease detection using our novel approach!",
    tags: [
      "machine-learning",
      "healthcare",
      "medical-diagnostics",
      "research-findings",
    ],
    presentation: {
      title: "ML Healthcare Diagnostics Research",
      slides: [
        {
          id: 1,
          title: "Research Overview",
          content: "Machine Learning Applications in Early Disease Detection",
          layout: "title-content",
          background: "gradient-1",
          imageUrl: "",
          bulletPoints: [
            "Novel algorithm development for medical imaging",
            "94% accuracy in early disease detection",
            "Reduced false positives by 60%",
            "Faster diagnosis processing time",
          ],
          chartData: "",
          quoteText: "",
          quoteAuthor: "",
          leftContent: "",
          rightContent: "",
        },
        {
          id: 2,
          title: "Key Findings",
          content: "Our breakthrough results in healthcare AI",
          layout: "bullet-points",
          background: "gradient-2",
          imageUrl: "",
          bulletPoints: [
            "94% diagnostic accuracy achieved",
            "60% reduction in false positives",
            "40% faster processing time",
            "Validated across 5 major medical centers",
          ],
          chartData: "",
          quoteText: "",
          quoteAuthor: "",
          leftContent: "",
          rightContent: "",
        },
        {
          id: 3,
          title: "Methodology",
          content: "Advanced deep learning approach",
          layout: "split-view",
          background: "gradient-3",
          imageUrl: "",
          bulletPoints: [""],
          chartData: "",
          quoteText: "",
          quoteAuthor: "",
          leftContent:
            "Data Processing\n• Medical imaging datasets\n• Feature extraction\n• Data augmentation\n• Cross-validation",
          rightContent:
            "Model Architecture\n• Convolutional Neural Networks\n• Transfer learning\n• Ensemble methods\n• Real-time inference",
        },
        {
          id: 4,
          title: "Impact & Future",
          content: "Transforming healthcare diagnostics",
          layout: "quote-highlight",
          background: "gradient-4",
          imageUrl: "",
          bulletPoints: [""],
          chartData: "",
          quoteText:
            "This research has the potential to revolutionize early disease detection and save countless lives through faster, more accurate diagnostics.",
          quoteAuthor: "Dr. Emily Zhang, Lead Researcher",
          leftContent: "",
          rightContent: "",
        },
      ],
    },
    metrics: {
      likes: 67,
      comments: 23,
      shares: 18,
      views: 342,
    },
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "1",
    type: "research" as const,
    author: {
      name: "Dr. Sarah Chen",
      title: "AI Researcher at Stanford University",
      avatar: "/api/placeholder/48/48",
      isOnline: true,
    },
    timestamp: "2 hours ago",
    content:
      "Just published our latest findings on neural network optimization using quantum-inspired algorithms. The results show a 40% improvement in training efficiency compared to traditional methods. Looking forward to collaborating with researchers working on similar problems!",
    tags: [
      "artificial-intelligence",
      "quantum-computing",
      "neural-networks",
      "optimization",
    ],
    attachments: [
      {
        type: "file" as const,
        name: "quantum_nn_optimization_paper.pdf",
        url: "#",
      },
      {
        type: "link" as const,
        name: "Code Repository - GitHub",
        url: "#",
      },
    ],
    metrics: {
      likes: 47,
      comments: 12,
      shares: 8,
      views: 234,
    },
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "2",
    type: "discussion" as const,
    author: {
      name: "Prof. Michael Johnson",
      title: "Climate Scientist at MIT",
      avatar: "/api/placeholder/48/48",
      isOnline: false,
    },
    timestamp: "4 hours ago",
    content:
      "Has anyone worked with satellite data for tracking deforestation patterns? We're looking for collaborators on a new project analyzing Amazon rainforest changes over the past decade. Would love to connect with remote sensing experts!",
    tags: [
      "climate-science",
      "remote-sensing",
      "deforestation",
      "satellite-data",
    ],
    metrics: {
      likes: 23,
      comments: 18,
      shares: 5,
      views: 156,
    },
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    type: "milestone" as const,
    author: {
      name: "Dr. Lisa Wang",
      title: "Biotech Engineer at UCSF",
      avatar: "/api/placeholder/48/48",
      isOnline: true,
    },
    timestamp: "6 hours ago",
    content:
      "🎉 Excited to announce that our CRISPR gene therapy trial has successfully completed Phase II! We achieved a 85% success rate in treating inherited blindness. Special thanks to our amazing research team and all the volunteers who made this possible.",
    tags: ["biotechnology", "CRISPR", "gene-therapy", "clinical-trials"],
    attachments: [
      {
        type: "image" as const,
        name: "trial_results_chart.png",
        url: "#",
      },
    ],
    metrics: {
      likes: 89,
      comments: 24,
      shares: 15,
      views: 445,
    },
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "4",
    type: "project" as const,
    author: {
      name: "Dr. Robert Kim",
      title: "Physics Professor at Caltech",
      avatar: "/api/placeholder/48/48",
      isOnline: false,
    },
    timestamp: "1 day ago",
    content:
      "Starting a new collaborative project on quantum entanglement applications in secure communication. Looking for theoretical physicists and computer scientists interested in quantum cryptography. We have funding for 3 postdoc positions!",
    tags: [
      "quantum-physics",
      "cryptography",
      "quantum-entanglement",
      "collaboration",
    ],
    metrics: {
      likes: 34,
      comments: 9,
      shares: 12,
      views: 278,
    },
    isLiked: false,
    isBookmarked: false,
  },
];

const sampleUser = {
  name: "Dr. Alex Thompson",
  avatar: "/api/placeholder/48/48",
  notifications: 3,
};

export default function HomeFeeds() {
  const [posts, setPosts] = useState(samplePosts);

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <Header user={sampleUser} />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
            {/* Create Post */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* Feed Controls */}
            <FeedControls />

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="px-8 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md">
                <span className="flex items-center space-x-2">
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Load More Posts</span>
                </span>
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Hidden on tablet and mobile */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 p-2 text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L3 11.414V17a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-5.586l1.293 1.293a1 1 0 001.414-1.414l-9-9z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>

          <button className="flex flex-col items-center space-y-1 p-2 text-gray-400">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs font-medium">Search</span>
          </button>

          <button className="flex flex-col items-center space-y-1 p-2 text-gray-400">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <span className="text-xs font-medium">Network</span>
          </button>

          <button className="flex flex-col items-center space-y-1 p-2 text-gray-400">
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
            <span className="text-xs font-medium">Messages</span>
          </button>

          <button className="flex flex-col items-center space-y-1 p-2 text-gray-400 relative">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs font-medium">Profile</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
