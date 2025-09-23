"use client";

import React from "react";

export default function RightSidebar() {
  const trendingTopics = [
    { name: "AI Ethics", posts: 234 },
    { name: "Quantum Computing", posts: 189 },
    { name: "CRISPR Research", posts: 156 },
    { name: "Climate Modeling", posts: 143 },
    { name: "Neural Networks", posts: 127 },
  ];

  const suggestedCollaborators = [
    {
      name: "Dr. Sarah Chen",
      title: "AI Researcher at Stanford",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 12,
    },
    {
      name: "Prof. Michael Johnson",
      title: "Climate Scientist at MIT",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 8,
    },
    {
      name: "Dr. Lisa Wang",
      title: "Biotech Engineer at UCSF",
      avatar: "/api/placeholder/40/40",
      mutualConnections: 15,
    },
  ];

  const upcomingEvents = [
    {
      title: "AI Research Symposium",
      date: "Oct 15, 2024",
      time: "2:00 PM EST",
      attendees: 156,
    },
    {
      title: "Climate Data Workshop",
      date: "Oct 18, 2024",
      time: "10:00 AM EST",
      attendees: 89,
    },
    {
      title: "Biotech Innovation Forum",
      date: "Oct 22, 2024",
      time: "1:00 PM EST",
      attendees: 203,
    },
  ];

  return (
    <aside className="w-80 bg-white border-l border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Trending Topics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Trending Topics</h3>
          <div className="space-y-3">
            {trendingTopics.map((topic) => (
              <div
                key={topic.name}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">#{topic.name}</p>
                  <p className="text-sm text-gray-500">{topic.posts} posts</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Collaborators */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">
            Suggested Collaborators
          </h3>
          <div className="space-y-4">
            {suggestedCollaborators.map((person) => (
              <div key={person.name} className="flex items-start space-x-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={person.avatar}
                  alt={person.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {person.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {person.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {person.mutualConnections} mutual connections
                  </p>
                </div>
                <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-200 rounded-full hover:bg-blue-50">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="border-l-4 border-blue-500 pl-3"
              >
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </p>
                <p className="text-xs text-gray-500">
                  {event.attendees} attending
                </p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Events
          </button>
        </div>
      </div>
    </aside>
  );
}
