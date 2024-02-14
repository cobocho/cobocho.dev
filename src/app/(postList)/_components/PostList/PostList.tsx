import PageList from '../PageList/PageList';
import PostCard from '../PostCard/PostCard';

import Post from '@/types/post';

import { CATEGORY_DESCRIPTIONS, KOR_CATEGORY, KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import AppearLeft from '@/app/_components/Motion/AppearLeft';
import { PostListDescription, PostListTitle, PostListTitleWrapper, postList } from './PostList.css';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

interface Props {
  title: KOR_CATEGORY_KEYS;
  posts: Post[];
  postQuantity?: number;
  children?: JSX.Element[];
}

const Title = ({ postTitle, description }: { postTitle: string; description: string }) => {
  return (
    <>
      <p className={PostListTitle}>{postTitle}</p>
      <p className={PostListDescription}>{description}</p>
    </>
  );
};

const PostList = ({ title, posts, postQuantity }: Props) => {
  const description = CATEGORY_DESCRIPTIONS[title];

  return (
    <section>
      <AppearLeft className={PostListTitleWrapper}>
        <Title postTitle={KOR_CATEGORY[title]} description={description} />
      </AppearLeft>
      <AppearBottom>
        <ul className={postList}>
          {posts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
            return (
              <div key={slug}>
                <PostCard
                  slug={slug}
                  category={category}
                  title={title}
                  thumbnail={thumbnail}
                  description={description}
                  date={date}
                  tags={tags}
                />
              </div>
            );
          })}
        </ul>
      </AppearBottom>
      {postQuantity && <PageList postQuantity={postQuantity} />}
    </section>
  );
};

export default PostList;
