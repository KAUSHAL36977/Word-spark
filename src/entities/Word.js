// Word entity with local storage implementation
class Word {
  static STORAGE_KEY = 'wordmaster_words';
  
  constructor(data) {
    this.id = data.id || this.generateId();
    this.word = data.word;
    this.definition = data.definition;
    this.example = data.example || '';
    this.synonyms = data.synonyms || [];
    this.antonyms = data.antonyms || [];
    this.difficulty = data.difficulty || 'intermediate';
    this.category = data.category || 'general';
    this.etymology = data.etymology || '';
    this.is_favorite = data.is_favorite || false;
    this.is_learned = data.is_learned || false;
    this.created_date = data.created_date || new Date().toISOString();
  }
  
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  static async create(wordData) {
    const word = new Word(wordData);
    const words = this.getAll();
    words.push(word);
    this.saveAll(words);
    return word;
  }
  
  static async list(sortBy = '-created_date') {
    const words = this.getAll();
    
    if (sortBy === '-created_date') {
      return words.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
    
    return words;
  }
  
  static async update(id, updates) {
    const words = this.getAll();
    const index = words.findIndex(word => word.id === id);
    
    if (index !== -1) {
      words[index] = { ...words[index], ...updates };
      this.saveAll(words);
      return words[index];
    }
    
    throw new Error('Word not found');
  }
  
  static async delete(id) {
    const words = this.getAll();
    const filteredWords = words.filter(word => word.id !== id);
    this.saveAll(filteredWords);
  }
  
  static getAll() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }
  
  static saveAll(words) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(words));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  static clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

export { Word }; 