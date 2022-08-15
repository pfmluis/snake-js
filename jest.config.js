module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
