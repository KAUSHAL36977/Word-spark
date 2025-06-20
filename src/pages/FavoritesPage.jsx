
import React, { useState, useEffect } from "react";
import { Word } from "@/entities/Word";
import WordCard from "../components/WordCard";
import { Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterWords();
  }, [favoriteWords, searchTerm]);

  const loadFavorites = async () => {
    try {
      const allWords = await Word.list("-created_date");
      const favorites = allWords.filter(word => word.is_favorite);
      setFavoriteWords(favorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
    setIsLoading(false);
  };

  const filterWords = () => {
    if (!searchTerm) {
      setFilteredWords(favoriteWords);
    } else {
      const filtered = favoriteWords.filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWords(filtered);
    }
    setCurrentWordIndex(0);
  };

  const handleFavoriteToggle = (wordId, isFavorite) => {
    if (!isFavorite) {
      // Remove from favorites
      setFavoriteWords(prev => prev.filter(word => word.id !== wordId));
      setFilteredWords(prev => prev.filter(word => word.id !== wordId));
      
      // Adjust current index if necessary
      // If the removed word was the last one and there are other words left,
      // decrement the current index to show the new last word.
      // If it was the only word or the first word and no previous words, then stay at 0.
      if (currentWordIndex >= filteredWords.length - 1 && currentWordIndex > 0) {
        setCurrentWordIndex(currentWordIndex - 1);
      } else if (currentWordIndex === 0 && filteredWords.length - 1 === 0) {
        // If it was the last word in the filtered list, and now list is empty, reset index
        setCurrentWordIndex(0); 
      }
    }
  };

  const nextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 bg-black min-h-screen">
        <div className="text-center py-16">
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 bg-black min-h-screen pt-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 clay-button-dark rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
             style={{
               background: 'linear-gradient(135deg, #F87171, #EF4444)',
               boxShadow: '0 20px 40px rgba(248, 113, 113, 0.3)'
             }}>
          <Heart className="w-8 h-8 text-white fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Favorite Words</h1>
        <p className="text-gray-400">
          {favoriteWords.length} words saved to your favorites
        </p>
      </div>

      {favoriteWords.length === 0 ? (
        <div className="text-center py-16">
          <div className="clay-card-dark rounded-3xl p-8 border-0"
               style={{
                 background: 'linear-gradient(145deg, #1f2937, #111827)',
                 border: '1px solid rgba(75, 85, 99, 0.3)'
               }}>
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              No Favorite Words Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start marking words as favorites while learning to build your personal collection.
            </p>
            <Button
              onClick={() => window.location.href = '/Generate'}
              className="clay-button-dark rounded-2xl px-6 py-3 border-0 transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
                boxShadow: '0 8px 20px rgba(30, 144, 255, 0.3)',
                color: 'white'
              }}
            >
              Generate New Words
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#60A5FA' }} />
              <Input
                type="text"
                placeholder="Search your favorite words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="clay-button-dark rounded-2xl pl-10 py-3 border-0 text-white placeholder-gray-500"
                style={{
                  background: 'linear-gradient(145deg, #374151, #4b5563)',
                  border: '1px solid rgba(96, 165, 250, 0.3)'
                }}
              />
            </div>
          </div>

          {filteredWords.length === 0 ? (
            <div className="text-center py-8">
              <div className="clay-card-dark rounded-2xl p-6 border-0"
                   style={{
                     background: 'linear-gradient(145deg, #1f2937, #111827)',
                     border: '1px solid rgba(75, 85, 99, 0.3)'
                   }}>
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500">
                  No words found matching "{searchTerm}"
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                <div className="clay-card-dark rounded-2xl px-4 py-2 border-0 font-medium"
                     style={{
                       background: 'linear-gradient(135deg, #F87171, #EF4444)',
                       boxShadow: '0 8px 20px rgba(248, 113, 113, 0.3)',
                       color: 'white'
                     }}>
                  {filteredWords.length > 0 ? currentWordIndex + 1 : 0} of {filteredWords.length}
                </div>
              </div>

              {filteredWords[currentWordIndex] && (
                <WordCard
                  word={filteredWords[currentWordIndex]}
                  onFavoriteToggle={handleFavoriteToggle}
                  onNext={currentWordIndex < filteredWords.length - 1 ? nextWord : null}
                  onPrevious={currentWordIndex > 0 ? previousWord : null}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
