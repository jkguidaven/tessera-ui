/**
 * Tessera UI — Test Setup
 *
 * Global test configuration and helpers.
 */

// Retry flaky tests up to 2 times before failing.
// This handles transient browser/timing issues in E2E tests.
jest.retryTimes(5, { logErrorsBeforeRetry: true });
