export function pipeDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
}
