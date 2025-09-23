import React from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";

const sampleUser = {
  name: "Dr. Alex Thompson",
  avatar: "/api/placeholder/48/48",
  notifications: 3,
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={sampleUser} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Projects
              </h1>
              <p className="text-gray-600 mb-6">
                Manage your research projects, track progress, and collaborate
                with team members.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  🚧 This page is coming soon! We'll implement the Projects
                  features step by step.
                </p>
              </div>
            </div>
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
