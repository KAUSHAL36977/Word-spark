import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

export default function GenerateButton({ onGenerate, isLoading }) {
  return (
    <div className="text-center">
      <Button
        onClick={onGenerate}
        disabled={isLoading}
        className="clay-button-dark rounded-3xl px-12 py-6 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black shadow-2xl shadow-orange-500/30 transform transition-all duration-300 hover:scale-105 active:scale-95 border-0"
        style={{
          background: isLoading 
            ? 'linear-gradient(135deg, #FF5722, #FBBF24)' 
            : 'linear-gradient(135deg, #FF5722, #FBBF24)',
          boxShadow: '0 20px 40px rgba(255, 87, 34, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
            Generating Words...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6 mr-3" />
            Generate My Vocabulary
          </>
        )}
      </Button>
      
      <p className="text-gray-400 mt-4 max-w-md mx-auto">
        Discover new vocabulary words with definitions, examples, synonyms, and antonyms
      </p>
    </div>
  );
}