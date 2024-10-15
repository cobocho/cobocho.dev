import { Post } from '@/interfaces/post'
import { Snippet } from '@/interfaces/snippet'

type LayoutIDType =
  | 'title'
  | 'thumbnail'
  | 'content'
  | 'category'
  | 'description'

export const generatePostLayoutId = (
  type: LayoutIDType,
  post: Post | Snippet,
) => {
  return `post-${type}-${post.slug}`
}
