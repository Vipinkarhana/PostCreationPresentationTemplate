"use client";

import React, { useState } from "react";

const FeedControls = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [viewMode, setViewMode] = useState("card");

  const filters = [
    { id: "all", label: "All Posts", count: 156, icon: "📋" },
    { id: "research", label: "Research", count: 45, icon: "🔬" },
    { id: "collaboration", label: "Collaborations", count: 23, icon: "🤝" },
    { id: "questions", label: "Questions", count: 34, icon: "❓" },
    { id: "announcements", label: "Announcements", count: 12, icon: "📢" },
    { id: "discussions", label: "Discussions", count: 42, icon: "💬" },
  ];

  const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "popular", label: "Most Popular" },
    { id: "trending", label: "Trending" },
    { id: "relevant", label: "Most Relevant" },
  ];

  const quickFilters = [
    "AI/ML",
    "Climate Science",
    "Biotechnology",
    "Space Research",
    "Medical Research",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Research Feed</h2>
          <p className="text-sm text-gray-600">
            Discover and engage with the latest research
          </p>
        </div>

        {/* Live Updates Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                liveUpdates ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600">Live Updates</span>
            <button
              onClick={() => setLiveUpdates(!liveUpdates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                liveUpdates ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  liveUpdates ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "card"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600"
              }`}
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600"
              }`}
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-sm font-medium text-gray-700">
            Quick Filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort and Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
          <input
            type="text"
            placeholder="Search posts, researchers, topics..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Refresh Button */}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh feed"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeFilter !== "all" && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              Showing <strong>{activeFilter}</strong> posts •{" "}
              {filters.find((f) => f.id === activeFilter)?.count} results
            </span>
            <button
              onClick={() => setActiveFilter("all")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedControls;
