module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/styleMock.js', // Replace with the correct path
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
