import { getIntersectionObserver } from '@/lib/observer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TabelOfContents = styled.nav`
  position: sticky;
  top: 300px;
  margin-left: 30px;
`

const Toc = () => {
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);
    headingElements.map((header) => {
      observer.observe(header);
    });
  }, []);
  console.log(currentId);

  return (
    <TabelOfContents>
      <ul className="headings">
        {
          headingEls.map((heading) => {
            return (
              <li key={`${heading.id}`}>
                <a href={`#${heading.id}`}>
                  {heading.textContent}
                </a>
              </li>
            )
          })
        }
      </ul>
    </TabelOfContents>
  )
}

export default Toc;
