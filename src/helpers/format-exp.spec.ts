import { formatExp } from './format-exp';

describe('format exp', () => {
  it('full value before 1k', () => {
    expect(formatExp(987)).toBe('987');
  });

  it('zero signs precision below 1kk', () => {
    expect(formatExp(1_000)).toBe('1k');
    expect(formatExp(9_987)).toBe('10k');
    expect(formatExp(287_700)).toBe('288k');
    expect(formatExp(999_444)).toBe('999k');
  });

  it('two digits precision above the 1kk', () => {
    expect(formatExp(999_999)).toBe('1kk');
    expect(formatExp(1_700_000)).toBe('1.7kk');
    expect(formatExp(1_788_000)).toBe('1.79kk');
    expect(formatExp(22_300_000)).toBe('22.3kk');
    expect(formatExp(999_999_000)).toBe('1kkk');
  });
});
