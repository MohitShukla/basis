// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // Required for testing React components
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Recognize these file extensions
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.jest.js' }],
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.jest.js' }],
    'node_modules/react-icons/.+\\.js$': ['babel-jest', { configFile: './babel.config.jest.js' }]
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-oauth|react-icons)/)'
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/api/**/*',
    '!**/node_modules/**',
    '!**/*.test.{js,jsx,ts,tsx}'
  ]
};