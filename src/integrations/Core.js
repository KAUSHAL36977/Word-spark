// Mock implementation for InvokeLLM
export async function InvokeLLM({ prompt, response_json_schema }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response with sample vocabulary words
  const mockWords = [
    {
      word: "Serendipity",
      definition: "The occurrence and development of events by chance in a happy or beneficial way.",
      example: "Finding that rare book at the garage sale was pure serendipity.",
      synonyms: ["fortune", "luck", "chance"],
      antonyms: ["misfortune", "bad luck"],
      difficulty: "intermediate",
      category: "general",
      etymology: "From the Persian fairy tale 'The Three Princes of Serendip' who made fortunate discoveries by accident."
    },
    {
      word: "Ubiquitous",
      definition: "Present, appearing, or found everywhere.",
      example: "Smartphones have become ubiquitous in modern society.",
      synonyms: ["omnipresent", "pervasive", "widespread"],
      antonyms: ["rare", "scarce", "uncommon"],
      difficulty: "advanced",
      category: "academic",
      etymology: "From Latin 'ubique' meaning 'everywhere'."
    },
    {
      word: "Eloquent",
      definition: "Fluent or persuasive in speaking or writing.",
      example: "Her eloquent speech moved the entire audience to tears.",
      synonyms: ["articulate", "fluent", "persuasive"],
      antonyms: ["inarticulate", "tongue-tied", "mute"],
      difficulty: "intermediate",
      category: "literature",
      etymology: "From Latin 'eloquens' meaning 'speaking out'."
    },
    {
      word: "Resilient",
      definition: "Able to withstand or recover quickly from difficult conditions.",
      example: "The resilient community rebuilt after the natural disaster.",
      synonyms: ["tough", "flexible", "adaptable"],
      antonyms: ["fragile", "brittle", "weak"],
      difficulty: "intermediate",
      category: "general",
      etymology: "From Latin 'resilire' meaning 'to leap back'."
    },
    {
      word: "Ephemeral",
      definition: "Lasting for a very short time; transitory.",
      example: "The beauty of cherry blossoms is ephemeral, lasting only a few days.",
      synonyms: ["transient", "fleeting", "momentary"],
      antonyms: ["permanent", "enduring", "lasting"],
      difficulty: "advanced",
      category: "literature",
      etymology: "From Greek 'ephemeros' meaning 'lasting only one day'."
    },
    {
      word: "Innovative",
      definition: "Featuring new methods, advanced ideas, or creative approaches.",
      example: "The company's innovative approach to problem-solving set it apart from competitors.",
      synonyms: ["creative", "inventive", "groundbreaking"],
      antonyms: ["conventional", "traditional", "ordinary"],
      difficulty: "intermediate",
      category: "business",
      etymology: "From Latin 'innovare' meaning 'to renew or change'."
    },
    {
      word: "Meticulous",
      definition: "Showing great attention to detail; very careful and precise.",
      example: "The meticulous artist spent months perfecting every brushstroke.",
      synonyms: ["thorough", "careful", "precise"],
      antonyms: ["careless", "sloppy", "negligent"],
      difficulty: "intermediate",
      category: "general",
      etymology: "From Latin 'metus' meaning 'fear' - originally meant 'fearful'."
    },
    {
      word: "Pragmatic",
      definition: "Dealing with things sensibly and realistically in a way that is based on practical rather than idealistic considerations.",
      example: "The pragmatic approach focused on what was achievable rather than what was ideal.",
      synonyms: ["practical", "realistic", "sensible"],
      antonyms: ["idealistic", "impractical", "unrealistic"],
      difficulty: "intermediate",
      category: "business",
      etymology: "From Greek 'pragma' meaning 'deed, act'."
    },
    {
      word: "Synthesis",
      definition: "The combination of ideas to form a theory or system.",
      example: "The research paper presented a synthesis of various theories on human behavior.",
      synonyms: ["combination", "integration", "fusion"],
      antonyms: ["analysis", "separation", "division"],
      difficulty: "advanced",
      category: "academic",
      etymology: "From Greek 'synthesis' meaning 'putting together'."
    },
    {
      word: "Catalyst",
      definition: "A person or thing that precipitates an event or change.",
      example: "The economic crisis acted as a catalyst for political reform.",
      synonyms: ["trigger", "stimulus", "spark"],
      antonyms: ["inhibitor", "obstacle", "barrier"],
      difficulty: "intermediate",
      category: "science",
      etymology: "From Greek 'katalysis' meaning 'dissolution' - originally a chemistry term."
    }
  ];
  
  return {
    words: mockWords
  };
} 