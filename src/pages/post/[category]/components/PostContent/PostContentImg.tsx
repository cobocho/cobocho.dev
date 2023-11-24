import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
	src: string;
	alt: string;
}

const PostContentImg = ({ src, alt }: Props) => {
	if (!src) return <></>;

	const image = require(`../../../../../../public${src}`).default;

	return (
		<Container
			width={image.width}
			aspectRatio={image.width / image.height}
		>
			<div className="image-box">
				<Image
					src={image}
					alt={alt}
					placeholder="blur"
					blurDataURL={image.src}
					loading="lazy"
					fill
				/>
			</div>
			{alt && <figcaption className="image-desc">{alt}</figcaption>}
		</Container>
	);
};

const Container = styled.figure<{ width: number; aspectRatio: number }>`
	position: relative;

	display: flex;
	align-items: center;
	flex-direction: column;

	.image-box {
		position: relative;
		width: ${(props) => (props.width > 900 ? '900px' : `${props.width}px`)};
		aspect-ratio: ${(props) => props.aspectRatio};
		background-color: ${(props) => props.theme.blockColor};
	}

	.image-desc {
		color: #a6a6a6;
	}

	@media (max-width: 900px) {
		.image-box {
			width: 100%;
		}
	}
`;

export default PostContentImg;
