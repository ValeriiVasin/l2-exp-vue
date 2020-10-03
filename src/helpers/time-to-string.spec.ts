import { timeToString } from './time-to-string';

describe('time to string', () => {
  it('less than a minute', () => {
    expect(timeToString(0)).toBe('1m');
  });

  it('minutes', () => {
    expect(timeToString(55)).toBe('55m');
  });

  it('hours', () => {
    expect(timeToString(60)).toBe('1h');
  });

  it('hours and minutes', () => {
    expect(timeToString(61)).toBe('1h 1m');
  });

  it('days', () => {
    expect(timeToString(24 * 60)).toBe('1d');
  });

  it('days and hours', () => {
    expect(timeToString(25 * 60)).toBe('1d 1h');
  });

  it('days and minutes', () => {
    expect(timeToString(24 * 60 + 1)).toBe('1d 1m');
  });

  it('days, hours and minutes', () => {
    expect(timeToString(26 * 60 + 3)).toBe('1d 2h 3m');
  });
});
