// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  testMatch: [
    '<rootDir>/**/*.spec.(ts|tsx|js)',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/enzyme.config.ts',
  ],
};
