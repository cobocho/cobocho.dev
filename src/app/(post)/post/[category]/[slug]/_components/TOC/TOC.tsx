'use client';

import Toolbox from './ToolBox/Toolbox';

import useTOC from '@/hooks/useTOC';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import { toc, tocItem, tocItemLink } from './TOC.css';

const TOC = () => {
  const { currentHeader, headingEls } = useTOC();

  return (
    <div>
      <AppearBottom>
        <nav className={toc}>
          <ul className="headers">
            <div>
              {headingEls.map((head) => (
                <li
                  key={head.id}
                  className={`${tocItem} ${head.nodeName}-header ${currentHeader === head.id && 'selected'}`}
                >
                  <a className={tocItemLink} href={`#${head.id}`}>
                    {head.textContent}
                  </a>
                </li>
              ))}
            </div>
          </ul>
          <Toolbox />
        </nav>
      </AppearBottom>
    </div>
  );
};

export default TOC;
