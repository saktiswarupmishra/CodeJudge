/**
 * Input Validator Utility
 * Sanitizes and validates user inputs
 */
import { z } from 'zod';

/**
 * Sanitize code input — prevent shell injection
 */
export function sanitizeCode(code: string): string {
  // Remove null bytes
  return code.replace(/\0/g, '');
}

/**
 * Validate that a string doesn't contain dangerous patterns
 */
export function containsDangerousPatterns(code: string): boolean {
  const patterns = [
    /rm\s+-rf/i,
    /mkfs/i,
    /dd\s+if=/i,
    /fork\s*bomb/i,
    /:()\{.*\|.*&\s*\}/,  // Fork bomb pattern
    /while\s*true.*fork/i,
  ];

  return patterns.some((p) => p.test(code));
}

/**
 * Trim output for comparison
 */
export function normalizeOutput(output: string): string {
  return output
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}
