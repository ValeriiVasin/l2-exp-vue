// Intl API is not working great in Node :(
export function formatNumber(value: number): string {
  if (Number.isNaN(value)) {
    return '';
  }

  value = Math.floor(value);
  const stringified = String(value);
  const length = stringified.length;
  let result = '';

  for (let i = length - 1; i >= 0; i--) {
    const char = stringified[i];
    const lastIndex = length - i;
    result = char + result;

    if (lastIndex % 3 === 0) {
      result = ` ${result}`;
    }
  }

  return result.trim();
}
