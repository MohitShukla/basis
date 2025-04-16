// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // Required for testing React components
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Recognize these file extensions
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use Babel to transform JS/TS files
    'node_modules/react-icons/.+\\.js$': ['babel-jest', { configFile: './babel.config.jest.js' }]
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '^react-markdown$': '<rootDir>/__mocks__/react-markdown.jsx'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-markdown|vfile|unist-util-[^/]+|remark-[^/]+|micromark-[^/]+|devlop|hast-util-[^/]+)',
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