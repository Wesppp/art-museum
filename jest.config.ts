module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/src$1',
    '^@services(.*)$': '<rootDir>/src/app/services$1',
    '^@components(.*)$': '<rootDir>/src/app/components$1',
    '^@enums(.*)$': '<rootDir>/src/app/enums$1',
    '^@models(.*)$': '<rootDir>/src/app/models$1',
    '^@modules(.*)$': '<rootDir>/src/app/modules$1',
    '^@utils(.*)$': '<rootDir>/src/app/utils$1',
    '^@environments(.*)$': '<rootDir>/src/environments$1',
    '^@pipes(.*)$': '<rootDir>/src/app/pipes$1',
    '^@directives(.*)$': '<rootDir>/src/app/directives$1',
    '^@constants(.*)$': '<rootDir>/src/app/constants$1',
  },
};
