import { Post } from '@/interfaces/post'

type LayoutIDType =
  | 'title'
  | 'thumbnail'
  | 'content'
  | 'category'
  | 'description'

export const generatePostLayoutId = (type: LayoutIDType, post: Post) => {
  return `post-${type}-${post.slug}`
}
