// Core type definitions for the Tarot Analysis application

export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  type: 'major' | 'minor';
  number?: number;
  isReversed: boolean;
  image: string;
  keywords: string[];
  meaning: {
    upright: string;
    reversed: string;
  };
  description: string;
}

export interface CardPosition {
  id: string;
  name: string;
  meaning: string;
  x: number;
  y: number;
}

export interface SpreadType {
  id: string;
  name: string;
  description: string;
  positions: CardPosition[];
  layout: LayoutConfig;
}

export interface LayoutConfig {
  width: number;
  height: number;
  cardSize: {
    width: number;
    height: number;
  };
}

export interface CardInterpretation {
  card: TarotCard;
  position: CardPosition;
  interpretation: string;
}

export interface Reading {
  id: string;
  timestamp: Date;
  question?: string;
  spread: SpreadType;
  cards: TarotCard[];
  interpretations: CardInterpretation[];
  overallAnalysis: string;
  advice: string;
}

export interface CombinationAnalysis {
  theme: string;
  connections: string[];
  overallMessage: string;
}

export interface AppState {
  currentView: 'home' | 'reading' | 'history';
  currentReading: Reading | null;
  history: Reading[];
}

export enum TarotErrorType {
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  SPREAD_NOT_FOUND = 'SPREAD_NOT_FOUND',
  INVALID_CARD_COUNT = 'INVALID_CARD_COUNT',
  STORAGE_ERROR = 'STORAGE_ERROR',
  READING_GENERATION_ERROR = 'READING_GENERATION_ERROR'
}

export interface TarotError {
  type: TarotErrorType;
  message: string;
  details?: any;
}

// Additional interfaces for complete type coverage

export interface TarotDeck {
  majorArcana: TarotCard[];
  minorArcana: {
    wands: TarotCard[];
    cups: TarotCard[];
    swords: TarotCard[];
    pentacles: TarotCard[];
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ReadingSession {
  id: string;
  startTime: Date;
  currentStep: 'spread-selection' | 'card-drawing' | 'interpretation' | 'complete';
  selectedSpread?: SpreadType;
  drawnCards: TarotCard[];
  question?: string;
}

// Data validation functions

export function validateTarotCard(card: any): ValidationResult {
  const errors: string[] = [];
  
  if (!card || typeof card !== 'object') {
    return { isValid: false, errors: ['Card must be an object'] };
  }
  
  if (!card.id || typeof card.id !== 'string') {
    errors.push('Card must have a valid string id');
  }
  
  if (!card.name || typeof card.name !== 'string') {
    errors.push('Card must have a valid string name');
  }
  
  if (!card.nameEn || typeof card.nameEn !== 'string') {
    errors.push('Card must have a valid string nameEn');
  }
  
  if (!['major', 'minor'].includes(card.type)) {
    errors.push('Card type must be either "major" or "minor"');
  }
  
  if (card.type === 'minor' && card.suit && !['wands', 'cups', 'swords', 'pentacles'].includes(card.suit)) {
    errors.push('Minor arcana card must have a valid suit');
  }
  
  if (card.number !== undefined && (typeof card.number !== 'number' || card.number < 0)) {
    errors.push('Card number must be a non-negative number');
  }
  
  if (typeof card.isReversed !== 'boolean') {
    errors.push('Card isReversed must be a boolean');
  }
  
  if (!card.image || typeof card.image !== 'string') {
    errors.push('Card must have a valid string image path');
  }
  
  if (!Array.isArray(card.keywords)) {
    errors.push('Card keywords must be an array');
  }
  
  if (!card.meaning || typeof card.meaning !== 'object' || 
      typeof card.meaning.upright !== 'string' || 
      typeof card.meaning.reversed !== 'string') {
    errors.push('Card must have valid upright and reversed meanings');
  }
  
  if (!card.description || typeof card.description !== 'string') {
    errors.push('Card must have a valid string description');
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateSpreadType(spread: any): ValidationResult {
  const errors: string[] = [];
  
  if (!spread || typeof spread !== 'object') {
    return { isValid: false, errors: ['Spread must be an object'] };
  }
  
  if (!spread.id || typeof spread.id !== 'string') {
    errors.push('Spread must have a valid string id');
  }
  
  if (!spread.name || typeof spread.name !== 'string') {
    errors.push('Spread must have a valid string name');
  }
  
  if (!spread.description || typeof spread.description !== 'string') {
    errors.push('Spread must have a valid string description');
  }
  
  if (!Array.isArray(spread.positions)) {
    errors.push('Spread positions must be an array');
  } else {
    spread.positions.forEach((position: any, index: number) => {
      const positionValidation = validateCardPosition(position);
      if (!positionValidation.isValid) {
        errors.push(`Position ${index}: ${positionValidation.errors.join(', ')}`);
      }
    });
  }
  
  if (!spread.layout || typeof spread.layout !== 'object') {
    errors.push('Spread must have a valid layout configuration');
  } else {
    const layoutValidation = validateLayoutConfig(spread.layout);
    if (!layoutValidation.isValid) {
      errors.push(`Layout: ${layoutValidation.errors.join(', ')}`);
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateCardPosition(position: any): ValidationResult {
  const errors: string[] = [];
  
  if (!position || typeof position !== 'object') {
    return { isValid: false, errors: ['Position must be an object'] };
  }
  
  if (!position.id || typeof position.id !== 'string') {
    errors.push('Position must have a valid string id');
  }
  
  if (!position.name || typeof position.name !== 'string') {
    errors.push('Position must have a valid string name');
  }
  
  if (!position.meaning || typeof position.meaning !== 'string') {
    errors.push('Position must have a valid string meaning');
  }
  
  if (typeof position.x !== 'number' || position.x < 0 || position.x > 100) {
    errors.push('Position x must be a number between 0 and 100');
  }
  
  if (typeof position.y !== 'number' || position.y < 0 || position.y > 100) {
    errors.push('Position y must be a number between 0 and 100');
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateLayoutConfig(layout: any): ValidationResult {
  const errors: string[] = [];
  
  if (!layout || typeof layout !== 'object') {
    return { isValid: false, errors: ['Layout must be an object'] };
  }
  
  if (typeof layout.width !== 'number' || layout.width <= 0) {
    errors.push('Layout width must be a positive number');
  }
  
  if (typeof layout.height !== 'number' || layout.height <= 0) {
    errors.push('Layout height must be a positive number');
  }
  
  if (!layout.cardSize || typeof layout.cardSize !== 'object') {
    errors.push('Layout must have a valid cardSize configuration');
  } else {
    if (typeof layout.cardSize.width !== 'number' || layout.cardSize.width <= 0) {
      errors.push('Card size width must be a positive number');
    }
    if (typeof layout.cardSize.height !== 'number' || layout.cardSize.height <= 0) {
      errors.push('Card size height must be a positive number');
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

export function validateReading(reading: any): ValidationResult {
  const errors: string[] = [];
  
  if (!reading || typeof reading !== 'object') {
    return { isValid: false, errors: ['Reading must be an object'] };
  }
  
  if (!reading.id || typeof reading.id !== 'string') {
    errors.push('Reading must have a valid string id');
  }
  
  if (!(reading.timestamp instanceof Date) && !Date.parse(reading.timestamp)) {
    errors.push('Reading must have a valid timestamp');
  }
  
  if (reading.question !== undefined && typeof reading.question !== 'string') {
    errors.push('Reading question must be a string if provided');
  }
  
  if (!reading.spread) {
    errors.push('Reading must have a spread');
  } else {
    const spreadValidation = validateSpreadType(reading.spread);
    if (!spreadValidation.isValid) {
      errors.push(`Spread: ${spreadValidation.errors.join(', ')}`);
    }
  }
  
  if (!Array.isArray(reading.cards)) {
    errors.push('Reading cards must be an array');
  } else {
    reading.cards.forEach((card: any, index: number) => {
      const cardValidation = validateTarotCard(card);
      if (!cardValidation.isValid) {
        errors.push(`Card ${index}: ${cardValidation.errors.join(', ')}`);
      }
    });
  }
  
  if (!Array.isArray(reading.interpretations)) {
    errors.push('Reading interpretations must be an array');
  }
  
  if (!reading.overallAnalysis || typeof reading.overallAnalysis !== 'string') {
    errors.push('Reading must have a valid overall analysis');
  }
  
  if (!reading.advice || typeof reading.advice !== 'string') {
    errors.push('Reading must have valid advice');
  }
  
  return { isValid: errors.length === 0, errors };
}

// Type guards for runtime type checking

export function isTarotCard(obj: any): obj is TarotCard {
  return validateTarotCard(obj).isValid;
}

export function isSpreadType(obj: any): obj is SpreadType {
  return validateSpreadType(obj).isValid;
}

export function isReading(obj: any): obj is Reading {
  return validateReading(obj).isValid;
}

export function isTarotError(obj: any): obj is TarotError {
  return obj && 
         typeof obj === 'object' && 
         Object.values(TarotErrorType).includes(obj.type) &&
         typeof obj.message === 'string';
}

// Utility functions for type safety

export function createTarotError(type: TarotErrorType, message: string, details?: any): TarotError {
  return { type, message, details };
}

export function generateReadingId(): string {
  return `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateCardId(type: 'major' | 'minor', suit?: string, number?: number): string {
  if (type === 'major') {
    return `major_${number || 0}`;
  }
  return `minor_${suit}_${number || 0}`;
}