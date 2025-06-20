
import React, { useState, useEffect } from "react";
import { Word } from "@/entities/Word";
import { InvokeLLM } from "@/integrations/Core";
import GenerateButton from "../components/GenerateButton";
import WordCard from "../components/WordCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shuffle } from "lucide-react";

export default function Generate() {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateWords = async () => {
    setIsLoading(true);
    try {
      const response = await InvokeLLM({
        prompt: `Generate 10 diverse English vocabulary words suitable for vocabulary learning. For each word, provide:
        1. The word itself
        2. A clear, comprehensive definition
        3. An example sentence using the word in context
        4. 2-3 synonyms (if available)
        5. 2-3 antonyms (if available)
        6. Difficulty level (beginner, intermediate, or advanced)
        7. Category (general, academic, business, science, or literature)
        8. A brief, interesting etymology or word origin.`,
        response_json_schema: {
          type: "object",
          properties: {
            words: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  word: { type: "string" },
                  definition: { type: "string" },
                  example: { type: "string" },
                  synonyms: { type: "array", items: { type: "string" } },
                  antonyms: { type: "array", items: { type: "string" } },
                  difficulty: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
                  category: { type: "string", enum: ["general", "academic", "business", "science", "literature"] },
                  etymology: { type: "string" }
                },
                required: ["word", "definition", "example", "difficulty", "category"]
              }
            }
          }
        }
      });

      if (response && response.words) {
        const savedWords = [];
        for (const wordData of response.words) {
          const savedWord = await Word.create(wordData);
          savedWords.push(savedWord);
        }
        
        setWords(savedWords);
        setCurrentWordIndex(0);
        setHasGenerated(true);
      }
    } catch (error) {
      console.error("Error generating words:", error);
    }
    setIsLoading(false);
  };

  const handleFavoriteToggle = (wordId, isFavorite) => {
    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordId ? { ...word, is_favorite: isFavorite } : word
      )
    );
  };
  
  const handleMarkAsLearned = (wordId, isLearned) => {
    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordId ? { ...word, is_learned: isLearned } : word
      )
    );
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const generateNewSet = () => {
    setWords([]);
    setCurrentWordIndex(0);
    setHasGenerated(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 bg-black min-h-screen">
      {!hasGenerated ? (
        <div className="text-center py-16">
          <div className="mb-12">
            <div className="w-24 h-24 mx-auto mb-6 clay-button-dark rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                 style={{
                   background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
                   boxShadow: '0 20px 40px rgba(30, 144, 255, 0.3)'
                 }}>
              <Shuffle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Expand Your Vocabulary?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Generate 10 carefully selected words with comprehensive definitions, examples, 
              synonyms, and antonyms to enhance your English vocabulary.
            </p>
          </div>
          
          <GenerateButton onGenerate={generateWords} isLoading={isLoading} />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={generateNewSet}
              className="clay-button-dark rounded-2xl px-4 py-2 border-0 transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #374151, #4b5563)',
                color: '#E5E7EB'
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Generate New Set
            </Button>
            
            <div className="clay-card-dark rounded-2xl px-4 py-2 border-0 font-medium"
                 style={{
                   background: 'linear-gradient(135deg, #1E90FF, #60A5FA)',
                   boxShadow: '0 8px 20px rgba(30, 144, 255, 0.3)',
                   color: 'white'
                 }}>
              Word {currentWordIndex + 1} of {words.length}
            </div>
          </div>

          {words[currentWordIndex] && (
            <WordCard
              word={words[currentWordIndex]}
              onFavoriteToggle={handleFavoriteToggle}
              onMarkAsLearned={handleMarkAsLearned}
              onNext={currentWordIndex < words.length - 1 ? nextWord : null}
              onPrevious={currentWordIndex > 0 ? previousWord : null}
            />
          )}
        </div>
      )}
    </div>
  );
}
