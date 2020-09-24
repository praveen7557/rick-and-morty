module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/tests/unit/**',
    '!<rootDir>/babel.config.js',
    '!<rootDir>/jest.config.js'
  ],
  coverageReporters: ['html', 'text-summary']
}
