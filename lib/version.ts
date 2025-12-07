/**
 * Version tracking system for Focus Dash
 *
 * Automatically increments version on each deployment.
 * Version format: Major.Minor (e.g., 1.0, 1.1, 1.2)
 *
 * To update version:
 * 1. Increment NEXT_PUBLIC_APP_VERSION in .env
 * 2. Update NEXT_PUBLIC_BUILD_DATE to current date
 * 3. Commit and push to Git
 */

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0'
export const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString().split('T')[0]
export const REPO_NAME = 'focusdashai.site'

export function getVersionInfo() {
  return {
    version: APP_VERSION,
    buildDate: BUILD_DATE,
    repoName: REPO_NAME,
  }
}
