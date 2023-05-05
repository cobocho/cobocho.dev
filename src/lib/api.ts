import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts');

export function getAllCategories(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getSlugsByCategory(category: string) {
  const filesRoot = join(postsDirectory, category);
  const slugs = fs.readdirSync(filesRoot, 'utf-8')
    .map(slug => {
      return {
        slug,
        category,
      }
    });
  return slugs;
}

export function getPostBySlug(slug: string, category:string, fields: string[] = []) {
  const postMdFileRoot = join(postsDirectory, category, slug);
  const postMdFile = fs.readFileSync(postMdFileRoot, 'utf8');
  const { data, content } = matter(postMdFile);

  type Items = {
    [key: string]: string
  }

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug.split(".md")[0];
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'category') {
      items[field] = category;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const categories = getAllCategories();
  const posts = categories.map((category) => getSlugsByCategory(category))
    .flat()
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts;
}

export function getAllPostsByCategory(category: string, fields: string[] = []) {
  const categories = getAllCategories();
  const posts = getSlugsByCategory(category)
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts;
}