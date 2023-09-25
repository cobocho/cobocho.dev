import styled from 'styled-components';
import { motion } from 'framer-motion';

import { orchestrate } from '@/styles/framer-motions';

import { BlogIcon, EmailIcon, GithubIcon, VelogIcon } from '@/components/Icons';
import CompanyList from './CompanyList';
import HistoryItem from './HistoryItem';
import TechStackList from './TechStackList';
import URLList from './URLList';

import TECH_STACKS from '@/constants/techStacks';
import NON_DEV_COMPANIES from '@/constants/companies';

const LINKS = [
	{
		name: 'Github',
		icon: <GithubIcon />,
		url: 'https://github.com/Cobocho',
	},
	{
		name: 'Blog',
		icon: <BlogIcon />,
		url: 'https://www.cobocho.dev',
	},
	{
		name: 'Velog',
		icon: <VelogIcon />,
		url: 'https://velog.io/@cobocho',
	},
];

const CONTACT = [
	{
		name: 'email',
		icon: <EmailIcon />,
		url: 'rlaalsrb1111@naver.com',
	},
];
const History = () => {
	return (
		<motion.div
			variants={orchestrate}
			initial="hidden"
			animate="visible"
		>
			<Container>
				<HistoryItem
					className="tech-stacks"
					title="Tech Stacks"
				>
					<TechStackList techStacks={TECH_STACKS} />
				</HistoryItem>
				<HistoryItem
					className="links"
					title="Links"
				>
					<URLList links={LINKS} />
				</HistoryItem>
				<HistoryItem
					className="contact"
					title="Contact"
				>
					<URLList links={CONTACT} />
				</HistoryItem>
				<HistoryItem
					className="dev-companies"
					title="Work Experience"
				>
					<CompanyList />
				</HistoryItem>
				<HistoryItem
					className="non-dev-companies"
					title="Non-Developer Work Experience"
					toggleMode
				>
					<CompanyList companies={NON_DEV_COMPANIES} />
				</HistoryItem>
			</Container>
		</motion.div>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-areas:
		'a a'
		'b c'
		'd d '
		'e e';
	grid-row-gap: 40px;

	.tech-stacks {
		grid-area: a;
	}

	.links {
		grid-area: b;
	}

	.contact {
		grid-area: c;
	}

	.dev-companies {
		grid-area: d;
	}

	.non-dev-companies {
		grid-area: e;
	}

	@media (max-width: 900px) {
		display: flex;
		flex-direction: column;
	}
`;

export default History;
