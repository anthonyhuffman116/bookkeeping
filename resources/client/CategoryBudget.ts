import CategoryBudget from './interfaces/CategoryBudget';

function calculateRemainingEarnings(expected: number, actual: number): number {
  if (actual > 0) {
    return expected - actual;
  } else {
    return expected + actual;
  }
}

export function calculateRemaining(expected: number, actual: number): null | number {
  if (expected == actual) {
    return 0;
  }
  if (expected > 0) {
    // earnings
    return calculateRemainingEarnings(expected, actual);
  } else if (actual < expected) {
    // spendings exceeded
    return null;
  }

  return expected - actual;
}

export function calculateBudget(categories: CategoryBudget[]): CategoryBudget[] {
  return categories.map((category) => {
    const actual = category.amount ?? 0.0;
    const expected = category.expectedAmount;

    let remaining = calculateRemaining(expected, actual);
    let percentage = 0;

    if (expected != 0) {
      percentage = Math.ceil((100 / Math.abs(expected)) * Math.abs(actual));
    }

    return { ...category, remaining, percentage };
  });
}
