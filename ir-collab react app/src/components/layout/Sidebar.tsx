import React from "react";

export default function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      items: [
        { name: "Feed", icon: "🏠", active: true },
        { name: "Analytics", icon: "📊" },
        { name: "Bookmarks", icon: "🔖" },
      ],
    },
    {
      title: "Research",
      items: [
        { name: "My Projects", icon: "🔬" },
        { name: "Publications", icon: "📄" },
        { name: "Data Sets", icon: "💾" },
        { name: "Literature", icon: "📚" },
      ],
    },
    {
      title: "Collaboration",
      items: [
        { name: "Teams", icon: "👥" },
        { name: "Messages", icon: "💬" },
        { name: "Meetings", icon: "📅" },
        { name: "Shared Docs", icon: "📝" },
      ],
    },
    {
      title: "Topics",
      items: [
        { name: "Machine Learning", icon: "🤖" },
        { name: "Climate Science", icon: "🌍" },
        { name: "Biotechnology", icon: "🧬" },
        { name: "Physics", icon: "⚛️" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-4">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
