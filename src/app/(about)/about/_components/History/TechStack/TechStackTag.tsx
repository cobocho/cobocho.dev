import { techStackTag } from './TechStackTag.css';

interface Props {
  tech: string;
}

const TechStackTag = ({ tech }: Props) => {
  return <span className={techStackTag}>{tech}</span>;
};

export default TechStackTag;
