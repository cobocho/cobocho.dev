import AppearBottom from '@/app/_components/Motion/AppearBottom';
import { urlIcon, urlItem, urlItemLink, urlItemName, urlList } from './UrlList.css';

interface LinkProps {
  icon: JSX.Element;
  name: string;
  url: string;
}

interface Props {
  links: LinkProps[];
}

const URLList = ({ links }: Props) => {
  return (
    <div className={urlList}>
      <ul>
        {links.map((link) => {
          return (
            <AppearBottom isOrchestration key={link.name}>
              <li className={urlItem}>
                <span className={urlIcon}>{link.icon}</span>
                <em className={urlItemName}>{link.name}</em>
                <a className={urlItemLink} target="_blank" href={link.url}>
                  {link.url}
                </a>
              </li>
            </AppearBottom>
          );
        })}
      </ul>
    </div>
  );
};

export default URLList;
