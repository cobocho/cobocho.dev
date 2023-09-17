import SeoHead from '@/components/SeoHead';
import TechStacks from './components/TechStacks/TechStacks';
import ProfileCard from './components/ProfileCard/ProfileCard';
import PageType from '@/types/page';

export default function Index() {
  return (
    <>
      <SeoHead page={PageType.Main} />
      <section>
        <ProfileCard />
        <TechStacks />
      </section>
    </>
  );
}
