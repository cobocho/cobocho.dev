import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
	src: string;
	alt: string;
}

const PostContentImg = ({ src, alt }: Props) => {
	const image = require(`../../../public${src}`).default;

	return (
		<Container
			width={image.width}
			aspectRatio={image.width / image.height}
		>
			<div className="image-box">
				{image.src.includes('.gif') ? (
					<Image
						src={image}
						alt={alt}
						placeholder="blur"
						blurDataURL={image.src}
						fill
						loading="lazy"
						sizes="100%"
					/>
				) : (
					<Image
						src={image}
						alt={alt}
						placeholder="blur"
						fill
						loading="lazy"
						sizes="100%"
					/>
				)}
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

		img {
			border-radius: 10px;

			background-color: ${(props) => props.theme.blockColor};
		}
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
