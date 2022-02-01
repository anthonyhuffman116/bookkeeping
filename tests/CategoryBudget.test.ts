import { calculateRemaining } from 'resources/client/CategoryBudget';

describe('a CategoryBudget', () => {
  test('remaining = 0 if expected matches actual', () => {
    expect(calculateRemaining(0, 0)).toBe(0);
    expect(calculateRemaining(-10, -10)).toBe(0);
    expect(calculateRemaining(10, 10)).toBe(0);
  });

  describe('earnings', () => {
    test('returns the full amount for a category if nothing was spent yet', () => {
      expect(calculateRemaining(-100, 0)).toBe(-100);
    });

    test('actual earnings lessen the remaining', () => {
      expect(calculateRemaining(100, 50)).toBe(50);
    });

    test('spendings will be added up', () => {
      expect(calculateRemaining(100, -50)).toBe(150);
    });

    test('more earnings will be cut off', () => {
      expect(calculateRemaining(100, 101)).toBe(0);
    });
  });

  describe('spendings', () => {
    test('returns null if spendings were exceeded', () => {
      expect(calculateRemaining(-100, -101)).toBe(null);
    });

    test('calculates remaining', () => {
      expect(calculateRemaining(-100, -50)).toBe(-50);
    });

    test('calculates remaining if got money back', () => {
      expect(calculateRemaining(-100, 30)).toBe(-70);
    });

    test('calculates remaining if got more money back', () => {
      expect(calculateRemaining(-100, 130)).toBe(0);
    });

    test('remaining is always 0 if expected is 0', () => {
      expect(calculateRemaining(0, -100)).toBe(0);
      expect(calculateRemaining(0, 100)).toBe(0);
      expect(calculateRemaining(0, 0)).toBe(0);
    });
  });
});
