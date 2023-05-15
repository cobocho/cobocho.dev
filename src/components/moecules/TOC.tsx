import { getIntersectionObserver } from '@/lib/getIntersectionObserver';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { appearFromBottom, orchestrate } from '@/styles/framer-motions';

const TOCContainer = styled.div`
  .TOC {
    position: fixed;
    top: 200px;
    width: 250px;
    padding-left: 40px;
  }

  .TOC li {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 400;
    list-style: none;
    opacity: 0.4;
  }

  .TOC li.selected {
    opacity: 0.7;
  }

  .TOC li.selected::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    display: block;
    width: 3px;
    height: 100%;
    background-color: ${props => props.theme.textColor};
    opacity: 0.5;
  }

  .TOC li a {
    font-size: 15px;
    color: ${props => props.theme.textColor};
  }

  .TOC li.H2-header {
    margin-left: 15px;
  }

  .TOC li.H3-header {
    margin-left: 30px;
  }

  @media (max-width: 1420px) {
    display: none;
  }
`

const TOC = () => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);
    headingElements.map((header) => {
      observer.observe(header);
    });
  }, [router]);

  return (
    <TOCContainer>
      <motion.nav 
        className='TOC'
        variants={appearFromBottom}
        initial='hidden'
        animate='visible'
      >
        <ul>
          {headingEls.map((head, i) => {
            const isCurrentHead = head.id === currentId;
            return (
              <li
                key={i}
                className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}
              >
                <a href={`#${head.id}`}>{head.textContent}</a>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    </TOCContainer>
  );
};

export default TOC;