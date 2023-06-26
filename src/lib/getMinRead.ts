export function getMinRead(text: string): number {
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;
  const minRead = Math.ceil(wordCount / 200);
  return minRead;
}
