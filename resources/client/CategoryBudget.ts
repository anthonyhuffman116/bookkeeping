import CategoryBudget from './interfaces/CategoryBudget';

function earnings(expected: number, actual: number): number {
  if (actual > expected) {
    return 0;
  } else {
    return expected - actual;
  }
}

function moneyBack(expected: number, actual: number): number {
  if (actual + expected > 0) {
    return 0;
  }

  return expected + actual;
}

function spendings(expected: number, actual: number): null | number {
  if (actual < expected) {
    // spendings exceeded
    return null;
  } else if (actual > 0) {
    return moneyBack(expected, actual);
  }

  return expected - actual;
}

export function calculateRemaining(expected: number, actual: number): null | number {
  if (expected == 0 || expected == actual) {
    return 0;
  }

  if (expected > 0) {
    // earnings
    return earnings(expected, actual);
  } else {
    return spendings(expected, actual);
  }
}

export function calculateBudget(categories: CategoryBudget[]): CategoryBudget[] {
  return categories.map((category) => {
    const actual = category.amount ?? 0.0;
    const expected = category.expectedAmount;

    let remaining = calculateRemaining(expected, actual);
    let percentage = 0;

    if (expected != 0) {
      percentage = Math.floor((100 / Math.abs(expected)) * Math.abs(actual));
    }

    return { ...category, remaining, percentage };
  });
}
