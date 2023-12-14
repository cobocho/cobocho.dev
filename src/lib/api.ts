import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Post from '@/types/post';

const postsDirectory = join(process.cwd(), '_posts');

interface Category {
  categoryName: string;
  quantity: number;
}

export const PostField = {
  slug: 'slug',
  title: 'title',
  category: 'category',
  tags: 'tags',
  date: 'date',
  thumbnail: 'thumbnail',
  description: 'description',
  content: 'content',
} as const;

export type PostField = (typeof PostField)[keyof typeof PostField];

export const allFields = Object.values(PostField);

/** 포스트를 페이지에 따라 분할합니다. */
const slicePage = (posts: Post[], page: number): Post[] => {
  return posts.slice((page - 1) * 10, 10 * page);
};

/** 포스트를 날짜순으로 정렬합니다. */
const sortByDate = (posts: Post[]): Post[] => {
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

/**
 * 모든 포스트를 불러옵니다.
 */
export function getAllPosts(fields?: PostField[], page?: number): Post[] {
  const categories = Array.from(getAllCategories(), ({ categoryName }) => categoryName);
  const posts = categories
    .map((category) => getSlugsByCategory(category))
    .flat()
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .reverse();

  const sortedPosts = sortByDate(posts);

  return page ? slicePage(sortedPosts, page) : sortedPosts;
}

/**
 * 카테고리의 모든 포스트를 불러옵니다.
 */
export function getAllPostsByCategory(category: string, fields: PostField[], page?: number) {
  const posts = getSlugsByCategory(category)
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .reverse();

  const sortedPosts = sortByDate(posts);

  return page ? slicePage(sortedPosts, page) : sortedPosts;
}

/**
 * 태그의 모든 포스트를 불러옵니다.
 */
export function getAllPostsByTag(tag: string, fields: PostField[], page?: number) {
  const posts = getAllPosts(fields)
    .filter(({ tags }) => tags.includes(tag))
    .reverse();

  const sortedPosts = sortByDate(posts);

  return page ? slicePage(sortedPosts, page) : sortedPosts;
}

/**
 * 모든 카테고리를 반환합니다.
 */
export function getAllCategories(): Category[] {
  const categories = fs.readdirSync(postsDirectory);

  const categoriesWithQuantity: Category[] = categories.map((category) => {
    const filesRoot = join(postsDirectory, category);
    const posts = fs.readdirSync(filesRoot).length;

    return { categoryName: category, quantity: posts };
  });

  return categoriesWithQuantity;
}

/**
 * 카테고리에 따른 파일명을 반환합니다.
 */
export function getSlugsByCategory(category: string) {
  const filesRoot = join(postsDirectory, category);
  const slugs = fs.readdirSync(filesRoot, 'utf-8').map((slug) => {
    return {
      slug,
      category,
    };
  });
  return slugs;
}

/**
 * 파일명에 따른 포스트를 반환합니다.
 */
export function getPostBySlug(slug: string, category: string, fields?: PostField[]) {
  const postMdFileRoot = join(postsDirectory, category, slug);
  const postMdFile = fs.readFileSync(`${postMdFileRoot}`, 'utf8');
  const { data, content } = matter(postMdFile);

  const post = {} as Post;

  if (!fields) {
    fields = Object.values(PostField);
  }

  fields.forEach((field) => {
    switch (field) {
      case PostField.slug:
        post[field] = slug.split('.md')[0];
        break;
      case PostField.content:
        post[field] = content;
        break;
      case PostField.category:
        post[field] = category;
        break;
      case PostField.slug:
        post[field] = slug.split('.md')[0];
        break;
      case PostField.thumbnail:
        post[field] = getThumbnail(data[field]);
        break;
      default:
        post[field] = data[field];
    }
  });

  return post;
}

/**
 * 모든 태그를 반환합니다.
 */
export function getAllTags(category?: string) {
  const allTags = category ? getAllPostsByCategory(category, ['tags']) : getAllPosts(['tags']);

  const tagsObj: Record<string, number> = {};

  allTags
    .map((item) => item.tags)
    .flat()
    .forEach((item) => {
      tagsObj[item] ? (tagsObj[item] += 1) : (tagsObj[item] = 1);
    });
  const tagKeys = Object.keys(tagsObj);

  const tags = tagKeys.map((tag) => {
    return {
      tagName: tag,
      quantity: tagsObj[tag],
    };
  });

  return tags;
}

export const getThumbnail = (src: string) => {
  const thumbnailURL = join(process.cwd(), 'public', src);
  const thumbnail = fs.readFileSync(thumbnailURL, 'base64');

  return `data:image/jpeg;base64,${thumbnail}`;
};
