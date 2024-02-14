import React from 'react';

export function replaceSpaceToHyphen(str: unknown) {
  if (typeof str === 'string') {
    return str.split(' ').join('-');
  }
}

export const timeAgo = (date: string) => {
  const postedDate = Number(new Date(date));
  const today = Number(new Date());
  const diff = today - postedDate;

  const seconds = Math.floor(diff / 1000);

  let interval = Math.floor(seconds / (60 * 60 * 24 * 30 * 12));
  if (interval > 1) {
    return interval + ' years ago';
  }

  interval = Math.floor(seconds / (60 * 60 * 24 * 30));
  if (interval >= 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / (60 * 60 * 24));
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / (60 * 60));
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if (seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

export const sortDescending = <T>(list: T[], prop: keyof T) => {
  return list.sort((a, b) => {
    if (typeof a[prop] !== 'number' || typeof b[prop] !== 'number') {
      throw new Error('property that cannot be arithmetic');
    }
    return (b[prop] as number) - (a[prop] as number);
  });
};

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
