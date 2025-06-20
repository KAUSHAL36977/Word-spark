import React, { useState } from "react";
import { Heart, Volume2, BookOpen, ArrowRight, ArrowLeft, Share2, CheckCircle2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Word } from "@/entities/Word";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WordCard({ word, onFavoriteToggle, onMarkAsLearned, onNext, onPrevious }) {
  const [isFavorite, setIsFavorite] = useState(word.is_favorite || false);
  const [isLearned, setIsLearned] = useState(word.is_learned || false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFavoriteToggle = async () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    try {
      await Word.update(word.id, { is_favorite: newStatus });
      if (onFavoriteToggle) onFavoriteToggle(word.id, newStatus);
    } catch (error) {
      setIsFavorite(!newStatus);
    }
  };

  const handleMarkAsLearned = async () => {
    const newStatus = !isLearned;
    setIsLearned(newStatus);
    try {
      await Word.update(word.id, { is_learned: newStatus });
      if (onMarkAsLearned) onMarkAsLearned(word.id, newStatus);
    } catch (error) {
      setIsLearned(!newStatus);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `WordMaster: ${word.word}`,
        text: `I just learned the word "${word.word}"!\n\nDefinition: ${word.definition}\n\nExample: ${word.example}`,
        url: window.location.href,
      });
    }
  };

  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 border-green-500/60';
      case 'intermediate': return 'text-amber-400 border-amber-500/60';
      case 'advanced': return 'text-red-400 border-red-500/60';
      default: return 'text-gray-400 border-gray-500/60';
    }
  };

  return (
    <div className={`clay-card-dark rounded-3xl p-6 md:p-8 mx-4 md:mx-0 transition-all duration-300 ${isLearned ? 'shadow-green-500/20' : 'shadow-blue-500/10'}`}
         style={{
           background: isLearned 
             ? 'linear-gradient(145deg, #1f3a2e, #0f2419)' 
             : 'linear-gradient(145deg, #1f2937, #111827)',
           border: isLearned 
             ? '1px solid rgba(0, 255, 133, 0.2)' 
             : '1px solid rgba(30, 144, 255, 0.1)'
         }}>
      
      {/* Top Section - Word, Pronounce, Actions */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {word.word}
            </h2>
            <Button
              onClick={handlePronounce}
              disabled={isPlaying}
              className="clay-button-dark rounded-full p-3 border-0 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
                boxShadow: '0 8px 20px rgba(30, 144, 255, 0.3)',
              }}
            >
              <Volume2 className={`w-5 h-5 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`clay-button-dark border-2 px-3 py-1 ${getDifficultyColor(word.difficulty)} font-semibold`}>
              {word.difficulty}
            </Badge>
            <Badge className="clay-button-dark border-2 text-cyan-400 border-cyan-500/60 px-3 py-1 font-semibold">
              {word.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <Button
            onClick={handleMarkAsLearned}
            className="clay-button-dark rounded-full p-3 border-0 transition-all duration-200"
            style={{
              background: isLearned 
                ? 'linear-gradient(135deg, #00FF85, #10D9C4)' 
                : 'linear-gradient(135deg, #374151, #4b5563)',
              boxShadow: isLearned 
                ? '0 8px 20px rgba(0, 255, 133, 0.3)' 
                : '0 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <CheckCircle2 className={`w-5 h-5 transition-colors ${isLearned ? 'text-black' : 'text-gray-400'}`} />
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            className="clay-button-dark rounded-full p-3 border-0 transition-all duration-200"
            style={{
              background: isFavorite 
                ? 'linear-gradient(135deg, #F87171, #EF4444)' 
                : 'linear-gradient(135deg, #374151, #4b5563)',
              boxShadow: isFavorite 
                ? '0 8px 20px rgba(248, 113, 113, 0.3)' 
                : '0 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'text-white fill-current' : 'text-gray-400'}`} />
          </Button>
          
          <Button
            onClick={handleShare}
            className="clay-button-dark rounded-full p-3 border-0 transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #374151, #4b5563)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Share2 className="w-5 h-5 text-gray-300" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8 mt-8">
        <div>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#1E90FF' }}>
            <BookOpen className="w-6 h-6" />
            Definition
          </h3>
          <p className="text-lg text-gray-200 leading-relaxed clay-card-dark rounded-2xl p-5" 
             style={{ 
               background: 'linear-gradient(145deg, #1a1a1a, #0f0f0f)', 
               border: '1px solid rgba(30, 144, 255, 0.2)' 
             }}>
            {word.definition}
          </p>
        </div>

        {word.example && (
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#10D9C4' }}>Example</h3>
            <p className="text-lg text-gray-300 italic leading-relaxed clay-card-dark rounded-2xl p-5"
               style={{ 
                 background: 'linear-gradient(145deg, #1a1a1a, #0f0f0f)', 
                 border: '1px solid rgba(16, 217, 196, 0.2)' 
               }}>
              "{word.example}"
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {word.synonyms && word.synonyms.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#00FF85' }}>Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((synonym) => (
                  <span key={synonym} className="clay-button-dark px-3 py-2 rounded-xl text-base font-medium border transition-all duration-200 hover:scale-105"
                        style={{ 
                          color: '#00FF85', 
                          borderColor: 'rgba(0, 255, 133, 0.4)',
                          background: 'linear-gradient(135deg, rgba(0, 255, 133, 0.1), rgba(16, 217, 196, 0.1))'
                        }}>
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}

          {word.antonyms && word.antonyms.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FBBF24' }}>Antonyms</h3>
              <div className="flex flex-wrap gap-2">
                {word.antonyms.map((antonym) => (
                  <span key={antonym} className="clay-button-dark px-3 py-2 rounded-xl text-base font-medium border transition-all duration-200 hover:scale-105"
                        style={{ 
                          color: '#FBBF24', 
                          borderColor: 'rgba(251, 191, 36, 0.4)',
                          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(255, 87, 34, 0.1))'
                        }}>
                    {antonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {word.etymology && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-700">
              <AccordionTrigger className="clay-button-dark rounded-2xl px-4 py-3 hover:no-underline transition-all duration-200"
                                style={{ 
                                  background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', 
                                  border: '1px solid rgba(139, 92, 246, 0.3)' 
                                }}>
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                  <span className="text-lg font-semibold text-gray-200">Word Origin</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-base text-gray-300 italic leading-relaxed clay-card-dark rounded-2xl p-5"
                   style={{ 
                     background: 'linear-gradient(145deg, #1a1a1a, #0f0f0f)', 
                     border: '1px solid rgba(139, 92, 246, 0.2)' 
                   }}>
                  {word.etymology}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-700">
        <Button
          onClick={onPrevious}
          disabled={!onPrevious}
          className="clay-button-dark rounded-2xl px-6 py-3 text-base disabled:opacity-50 border-0 transition-all duration-200"
          style={{
            background: onPrevious 
              ? 'linear-gradient(135deg, #374151, #4b5563)' 
              : 'linear-gradient(135deg, #1f2937, #374151)',
            color: onPrevious ? '#E5E7EB' : '#6B7280'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!onNext}
          className="clay-button-dark rounded-2xl px-6 py-3 text-base disabled:opacity-50 border-0 transition-all duration-200"
          style={{
            background: onNext 
              ? 'linear-gradient(135deg, #1E90FF, #60A5FA)' 
              : 'linear-gradient(135deg, #1f2937, #374151)',
            boxShadow: onNext ? '0 8px 20px rgba(30, 144, 255, 0.3)' : 'none',
            color: onNext ? 'white' : '#6B7280'
          }}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}