export function replaceSpaceToHyphen(str: unknown) {
  if (typeof str === 'string') {
    return str.split(' ').join('-');
  }
}
export function getMinRead(text: string): number {
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;
  const minRead = Math.ceil(wordCount / 200);
  return minRead;
}

export const calculatePages = (postQuantity: number) => {
  const pages = Array.from({ length: Math.ceil(postQuantity / 10) }, (_, i) => i + 1);
  return pages;
};
