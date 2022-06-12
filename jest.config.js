module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // fix bigint serialization issue
  // https://github.com/facebook/jest/issues/11617#issuecomment-1028651059
  maxWorkers: 1
};
