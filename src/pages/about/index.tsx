import SeoHead from '@/components/SeoHead/SeoHead';
import ProfileCard from './components/ProfileCard/ProfileCard';
import PageType from '@/types/page';
import History from './components/History/History';

export default function Index() {
	return (
		<>
			<SeoHead page={PageType.Main} />
			<section>
				<ProfileCard />
				<History />
			</section>
		</>
	);
}
