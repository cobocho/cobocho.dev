import { StaticImageData } from 'next/image';

interface Post {
  slug: string;
  title: string;
  date: string;
  thumbnail: StaticImageData;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

export default Post;
