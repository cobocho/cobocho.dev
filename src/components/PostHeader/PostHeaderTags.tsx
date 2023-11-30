import Link from 'next/link';
import styled from 'styled-components';
import TagIcon from '../Icons/TagIcon';

interface Props {
	tags: string[];
}

const PostHeaderTags = ({ tags }: Props) => {
	return (
		<Container>
			<TagIcon />
			<ul className="tags">
				{tags.map((tag) => {
					return (
						<li
							className="tag"
							key={tag}
						>
							<Link href={`/tags/${tag}/1`}># {tag}</Link>
						</li>
					);
				})}
			</ul>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;

	padding: 15px 0;

	opacity: 0.6;

	border-top: 0.5px solid ${(props) => props.theme.textColor};
	border-bottom: 0.1px solid ${(props) => props.theme.textColor};

	svg {
		transform: scale(0.7);
		margin-right: 8px;
		fill: ${(props) => props.theme.textColor};
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		color: ${(props) => props.theme.textColor};

		list-style-type: none;

		li {
			transition: all 1s;

			&:hover {
				font-weight: 500;
				transform-origin: top center;
				transform: translateY(-4px) scale(1.1);
			}
		}
	}
`;

export default PostHeaderTags;
