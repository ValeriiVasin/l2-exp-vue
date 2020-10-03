import { parseNumber } from './parse-number';

describe('parsing string to number', () => {
  it('parses number', () => {
    expect(parseNumber('10')).toBe(10);
  });

  it('parses number with trailing space', () => {
    expect(parseNumber('10 ')).toBe(10);
  });

  it('parses number with spaces in between', () => {
    expect(parseNumber('10 000 000')).toBe(10000000);
  });

  it('parses floating number', () => {
    expect(parseNumber('10.2')).toBe(10.2);
  });

  it('parses floating number with comma separator', () => {
    expect(parseNumber('10,2')).toBe(10.2);
  });

  it('parses k suffix', () => {
    expect(parseNumber('10k')).toBe(10000);
    expect(parseNumber('10kk')).toBe(10000000);
  });

  it('parses k suffix with floating number', () => {
    expect(parseNumber('10.2k')).toBe(10200);
    expect(parseNumber('10,2k')).toBe(10200);
    expect(parseNumber('10.2kk')).toBe(10200000);
  });

  it('NaN for invalid numbers', () => {
    expect(parseNumber('hello')).toBeNaN();
  });

  it('empty string is not valid', () => {
    expect(parseNumber('')).toBeNaN();
  });

  it('zero', () => {
    expect(parseNumber('0')).toBe(0);
  });
});
