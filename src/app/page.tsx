"use client";

import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <main suppressHydrationWarning className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to the Car3 Partner Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your certified vehicle inventory, leads, and AI-powered inspections – all in one place.
        </p>

        <div className="text-left text-gray-700 space-y-3 max-w-lg mx-auto">
          {[
            "Secure Login with Google Workspace",
            "Dashboard for Car Certification Workflow",
            "AI-Enhanced Vehicle Inspection & Reporting",
            "Lead Management & Follow-ups",
            "Instant PDF Certification Reports",
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        
        
      </div>
    </main>
  );
}
