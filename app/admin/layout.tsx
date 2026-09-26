import React from 'react';
import type { Metadata } from 'next';
import { AdminSidebar } from './sidebar';

export const metadata: Metadata = {
  title: 'Admin Console // Dossier CMS',
  description: 'Privileged portfolio administration, content authoring, and system taxonomy.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col lg:flex-row antialiased selection:bg-neutral-800 selection:text-white">
      {/* Dark Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Viewport */}
      <main className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
