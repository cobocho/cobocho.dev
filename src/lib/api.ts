import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts');

interface Category {
  categoryName: string,
  quantity: number,
}

export function getAllCategories(): Category[] {
  const categories = fs.readdirSync(postsDirectory);
  const categoriesWithQuantity = categories.map(category => {
    const filesRoot = join(postsDirectory, category);
    const posts = fs.readdirSync(filesRoot).length;
    return { categoryName: category, quantity: posts };
  });
  return categoriesWithQuantity;
}

export function getSlugsByCategory(category: string) {
  const filesRoot = join(postsDirectory, category);
  const slugs = fs.readdirSync(filesRoot, 'utf-8')
    .map((slug) => {
      return {
        slug,
        category,
      }
    });
  return slugs;
}

export function getPostBySlug(slug: string, category:string, fields: string[] = []) {
  const postMdFileRoot = join(postsDirectory, category, slug);
  const postMdFile = fs.readFileSync(`${postMdFileRoot}`, 'utf8');
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

export function getAllPosts(fields: string[] = [], page? : string | number) {
  const currentPage = Number(page);
  const categories = getAllCategories();
  const categoriesWithoutquantity = categories.map((item) => item.categoryName);
  const posts = categoriesWithoutquantity.map((category) => getSlugsByCategory(category))
    .flat()
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .reverse()
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  if (page) {
    return posts.slice((currentPage - 1) * 10, 10 * currentPage);
  }

  return posts;
}

export function getAllPostsByCategory(category: string, fields: string[] = [], page? : string | number) {
  const currentPage = Number(page);
  const posts = getSlugsByCategory(category)
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .reverse()
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  if (page) {
    return posts.slice((currentPage - 1) * 10, 10 * currentPage);
  }
  return posts;
}

export function getAllPostsByTag(tag: string, fields: string[] = [], page? : string | number) {
  const currentPage = Number(page);
  const posts = getAllPosts(fields)
    .filter(({ tags }) =>tags.includes(tag))
    .reverse()
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  
  if (page) {
    return posts.slice((currentPage - 1) * 10, 10 * currentPage);
  }

  return posts;
}

export function getAllTags(category?: string) {
  const allTags = category ? getAllPostsByCategory(category, ["tags"]) : getAllPosts(["tags"]);
  const tagsObj: { [key: string]: number } = {};
  allTags
    .map(item => item.tags)
    .flat()
    .forEach(item => {
      if (!tagsObj[item]) tagsObj[item] = 1;
      else tagsObj[item] += 1;
    });
  const tagKeys = Object.keys(tagsObj);
  const tags = tagKeys.map(tag => {
    return { 
      tagName: tag,
      quantity: tagsObj[tag], 
    }
  })

  return tags;
}


