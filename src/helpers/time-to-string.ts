const DAY_IN_MINUTES = BigInt(60 * 24);
const HOUR_IN_MINUTES = BigInt(60);
export function timeToString(timeInMinutes: number | bigint): string {
  if (typeof timeInMinutes === 'number') {
    timeInMinutes = BigInt(timeInMinutes);
  }

  const days = timeInMinutes / DAY_IN_MINUTES;
  timeInMinutes -= days * DAY_IN_MINUTES;
  const hours = timeInMinutes / HOUR_IN_MINUTES;
  timeInMinutes -= hours * HOUR_IN_MINUTES;
  const minutes = timeInMinutes;

  const result: string[] = [];
  if (days) {
    result.push(`${days}d`);
  }

  if (hours) {
    result.push(`${hours}h`);
  }

  if (minutes) {
    result.push(`${minutes}m`);
  }

  return result.length ? result.join(' ') : '0m';
}
