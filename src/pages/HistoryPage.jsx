
import React, { useState, useEffect } from "react";
import { Word } from "@/entities/Word";
import WordCard from "../components/WordCard";
import { History as HistoryIcon, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function History() {
  const [allWords, setAllWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterWords();
  }, [allWords, filterBy]);

  const loadHistory = async () => {
    try {
      const words = await Word.list("-created_date");
      setAllWords(words);
    } catch (error) {
      console.error("Error loading history:", error);
    }
    setIsLoading(false);
  };

  const filterWords = () => {
    let filtered = [...allWords];

    switch (filterBy) {
      case "today":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = allWords.filter(word => {
          const wordDate = new Date(word.created_date);
          wordDate.setHours(0, 0, 0, 0);
          return wordDate.getTime() === today.getTime();
        });
        break;
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = allWords.filter(word => 
          new Date(word.created_date) >= weekAgo
        );
        break;
      case "month":
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = allWords.filter(word => 
          new Date(word.created_date) >= monthAgo
        );
        break;
      case "favorites":
        filtered = allWords.filter(word => word.is_favorite);
        break;
      default:
        filtered = allWords;
    }

    setFilteredWords(filtered);
    setCurrentWordIndex(0);
  };

  const handleFavoriteToggle = (wordId, isFavorite) => {
    setAllWords(prev => 
      prev.map(word => 
        word.id === wordId ? { ...word, is_favorite: isFavorite } : word
      )
    );
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
               background: 'linear-gradient(135deg, #10D9C4, #00FF85)',
               boxShadow: '0 20px 40px rgba(16, 217, 196, 0.3)'
             }}>
          <HistoryIcon className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Learning History</h1>
        <p className="text-gray-400">
          Track your vocabulary learning journey
        </p>
      </div>

      {allWords.length === 0 ? (
        <div className="text-center py-16">
          <div className="clay-card-dark rounded-3xl p-8 border-0"
               style={{
                 background: 'linear-gradient(145deg, #1f2937, #111827)',
                 border: '1px solid rgba(75, 85, 99, 0.3)'
               }}>
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              No Learning History Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start generating words to build your learning history and track your progress.
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
              Generate Your First Words
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" style={{ color: '#60A5FA' }} />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="clay-button-dark rounded-2xl w-40 border-0 text-white"
                              style={{
                                background: 'linear-gradient(145deg, #374151, #4b5563)',
                                border: '1px solid rgba(96, 165, 250, 0.3)'
                              }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Words</SelectItem>
                  <SelectItem value="today" className="text-white hover:bg-gray-700">Today</SelectItem>
                  <SelectItem value="week" className="text-white hover:bg-gray-700">This Week</SelectItem>
                  <SelectItem value="month" className="text-white hover:bg-gray-700">This Month</SelectItem>
                  <SelectItem value="favorites" className="text-white hover:bg-gray-700">Favorites Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredWords.length === 0 ? (
            <div className="text-center py-8">
              <div className="clay-card-dark rounded-2xl p-6 border-0"
                   style={{
                     background: 'linear-gradient(145deg, #1f2937, #111827)',
                     border: '1px solid rgba(75, 85, 99, 0.3)'
                   }}>
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500">
                  No words found for the selected filter
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="clay-card-dark rounded-2xl px-4 py-2 border-0 font-medium"
                     style={{
                       background: 'linear-gradient(135deg, #10D9C4, #00FF85)',
                       boxShadow: '0 8px 20px rgba(16, 217, 196, 0.3)',
                       color: 'black'
                     }}>
                  {filteredWords.length > 0 ? currentWordIndex + 1 : 0} of {filteredWords.length}
                </div>
                {filteredWords[currentWordIndex] && (
                  <div className="clay-card-dark rounded-2xl px-4 py-2 border-0"
                       style={{
                         background: 'linear-gradient(145deg, #374151, #4b5563)',
                         border: '1px solid rgba(75, 85, 99, 0.3)'
                       }}>
                    <span className="text-gray-300 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(filteredWords[currentWordIndex].created_date)}
                    </span>
                  </div>
                )}
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
