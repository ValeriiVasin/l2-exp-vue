import { getExp } from './get-exp';

describe('Levels difference', () => {
  it('calculates for exact levels correctly', () => {
    expect(getExp({ from: 28, to: 40 })).toBe(51_357_498);
  });

  it('calculates for not precise levels correctly', () => {
    expect(getExp({ from: 53.7, to: 55 })).toBe(76_111_635);
  });

  it('calculates for max level', () => {
    expect(getExp({ from: 92, to: 93 })).toBe(
      630_290_119_652_118 - 219_717_789_420_024
    );
  });
});
