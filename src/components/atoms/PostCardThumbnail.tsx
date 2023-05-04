import Image from 'next/image'

type Props = {
  src: string,
  alt: string,
};

const PostCardThumbnail = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={250}
      style={{ 
        objectFit: 'cover',
        transition: "all 0.5s",
      }}
    />
  )
}

export default PostCardThumbnail;