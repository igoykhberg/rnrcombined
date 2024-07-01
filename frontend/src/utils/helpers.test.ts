import { isValidInput, containsDangerousCharacters } from './helpers';
import { expect, test } from 'vitest';

test('check valid input', () => {
  const cases = [
    ['B-52', false],
    ['B 52', false],
    ['Avdija', true],
    ['2-3 folks', false],
    [',.,.,.,.', false],
    ['007', false],
    ['1/8 L Jamaican', false],
    ['Danny Avdija', true],
  ];

  cases.forEach((cs) => {
    const result = isValidInput(cs[0] as string);
    expect(result).toBe(cs[1]);
  });
});

test('check dangerous characters', () => {
  const cases = [
    ['<script>alert(`XSS`)</script>', true],
    ["SELECT * FROM users WHERE id = '1';", true],
    ['tokyo1`supply', true],
  ];

  cases.forEach((cs) => {
    const result = containsDangerousCharacters(cs[0] as string);
    expect(result).toBe(cs[1]);
  });
});
