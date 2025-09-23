"use client";

import React from "react";

interface HeaderProps {
  user?: {
    name: string;
    avatar: string;
    notifications: number;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">IR Collab</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
            >
              Home
            </a>
            <a
              href="/network"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Network
            </a>
            <a
              href="/projects"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Projects
            </a>
            <a
              href="/messages"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Messages
            </a>
            <a
              href="/ecosystem"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Ecosystem
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search researchers, projects, topics..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
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
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-3.5-3.5a8.38 8.38 0 010-11.314l3.5-3.5H15m-6 0H4l3.5 3.5a8.38 8.38 0 010 11.314L4 17h5m-3-5h8m-8 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
              {user?.notifications && user.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                  {user.notifications}
                </span>
              )}
            </div>

            {/* User Avatar */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar || "/api/placeholder/32/32"}
                  alt={user?.name || "User"}
                />
                <span className="hidden md:block font-medium">
                  {user?.name || "User"}
                </span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
