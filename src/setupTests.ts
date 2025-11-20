// Jest setup file
import '@testing-library/jest-dom';

// This file is executed before each test file

// Mock console methods to reduce noise during testing
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Add any global test utilities here