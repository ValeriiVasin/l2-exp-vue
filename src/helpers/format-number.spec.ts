import { formatNumber } from './format-number';

describe('formatting number', () => {
  it('does not format numbers below 1000', () => {
    expect(formatNumber(999)).toBe('999');
  });

  it('splits every 3 digit with the space for numbers above 999', () => {
    expect(formatNumber(1000)).toBe('1 000');
    expect(formatNumber(10000)).toBe('10 000');
  });

  it('truncates fractional part', () => {
    expect(formatNumber(1000.22)).toBe('1 000');
  });

  it('formats NaN as an empty', () => {
    expect(formatNumber(NaN)).toBe('');
  });
});
