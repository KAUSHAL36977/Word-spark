import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Heart, History, Sparkles } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black">
      <style>
        {`
          :root {
            --electric-blue: #1E90FF;
            --electric-blue-light: #60A5FA;
            --neon-green: #00FF85;
            --neon-green-alt: #10D9C4;
            --vibrant-orange: #FF5722;
            --vibrant-amber: #FBBF24;
            --coral-red: #F87171;
            
            --clay-shadow-dark: 8px 8px 16px rgba(0, 0, 0, 0.8), -4px -4px 12px rgba(30, 144, 255, 0.05);
            --clay-shadow-inset-dark: inset 4px 4px 8px rgba(0, 0, 0, 0.8), inset -4px -4px 8px rgba(30, 144, 255, 0.1);
            --clay-shadow-pressed-dark: inset 8px 8px 16px rgba(0, 0, 0, 0.9), inset -8px -8px 16px rgba(30, 144, 255, 0.1);
          }
          
          .clay-button-dark {
            background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
            box-shadow: var(--clay-shadow-dark);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .clay-button-dark:hover {
            transform: translateY(-2px);
            box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.9), -12px -12px 24px rgba(30, 144, 255, 0.1);
          }
          
          .clay-button-dark:active {
            transform: translateY(0);
            box-shadow: var(--clay-shadow-pressed-dark);
          }
          
          .clay-card-dark {
            background: linear-gradient(145deg, #1f2937, #111827);
            box-shadow: var(--clay-shadow-dark);
            border: 1px solid rgba(30, 144, 255, 0.1);
          }
          
          .clay-nav-item-dark {
            background: linear-gradient(145deg, #374151, #4b5563);
            box-shadow: var(--clay-shadow-dark);
          }
          
          .clay-nav-item-dark.active {
            background: linear-gradient(145deg, var(--electric-blue), var(--electric-blue-light));
            box-shadow: var(--clay-shadow-inset-dark);
          }
        `}
      </style>
      
      {/* Header */}
      <header className="p-4 md:p-6 bg-black border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 clay-button-dark rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  WordMaster
                </h1>
                <p className="text-sm text-gray-400">Expand Your Vocabulary</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                to={createPageUrl("Generate")}
                className={`p-3 rounded-xl clay-nav-item-dark ${location.pathname === createPageUrl("Generate") ? 'active' : ''} transition-all duration-200`}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </Link>
              <Link 
                to={createPageUrl("Favorites")}
                className={`p-3 rounded-xl clay-nav-item-dark ${location.pathname === createPageUrl("Favorites") ? 'active' : ''} transition-all duration-200`}
              >
                <Heart className="w-5 h-5 text-white" />
              </Link>
              <Link 
                to={createPageUrl("History")}
                className={`p-3 rounded-xl clay-nav-item-dark ${location.pathname === createPageUrl("History") ? 'active' : ''} transition-all duration-200`}
              >
                <History className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8 bg-black min-h-screen">
        {children}
      </main>
    </div>
  );
}