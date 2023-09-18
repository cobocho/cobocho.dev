import styled from 'styled-components';
import TECH_STACKS from '@/constants/techStacks';
import TechStackTag from './TechStackTag';
import { motion } from 'framer-motion';
import { appearFromBottom, appearFromLeft, orchestrate, orchestrateTags } from '@/styles/framer-motions';

const TechStacks = () => {
  return (
    <motion.div
      variants={orchestrate}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <div className="tech-stacks">
          <motion.h3 variants={appearFromBottom}>Tech Stacks</motion.h3>
          <motion.ul variants={orchestrateTags}>
            {TECH_STACKS.map(({ name }) => {
              return (
                <motion.li
                  key={name}
                  variants={appearFromLeft}
                >
                  <TechStackTag tech={name} />
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
        <div className="links">
          <motion.h3 variants={appearFromBottom}>Links</motion.h3>
          <motion.ul variants={appearFromBottom}>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <em>github</em>
              <a
                target="_blank"
                href="https://github.com/Cobocho"
              >
                github.com/cobocho
              </a>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.994 9.095l2.974-2.884c.144-.14.331-.211.516-.211.188 0 .375.073.518.22l-4.032 3.911c-.283-.294-.268-.752.024-1.036zm-4.49 8.819c-.06.057-.136.086-.212.086-.168 0-.304-.137-.304-.304 0-.079.031-.159.093-.218l.5-.485.422.436-.499.485zm4.034-2.386c-.919.891-1.796 1.333-3.013 1.728l-.754-.779c.433-1.205.901-2.067 1.819-2.958l1.71-1.657 1.946 2.009-1.708 1.657zm6.965-6.483l-4.402 4.269-2.218-2.29 4.402-4.27c1.016-.984 2.703-.246 2.703 1.146 0 .416-.162.832-.485 1.145z" />
              </svg>
              <em>blog</em>
              <a
                target="_blank"
                href="https://www.cobocho.dev"
              >
                cobocho.dev
              </a>
            </li>
            <li>
              <svg
                width="24"
                height="24"
                viewBox="0 0 192 192"
              >
                <path
                  id="Website"
                  d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z"
                />
              </svg>
              <em>velog</em>
              <a
                target="_blank"
                href="https://velog.io/@cobocho"
              >
                velog.io/@cobocho
              </a>
            </li>
          </motion.ul>
        </div>
        <div className="contact">
          <motion.h3 variants={appearFromBottom}>Contact</motion.h3>
          <motion.ul variants={appearFromBottom}>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
              <em>email</em>
              <a
                target="_blank"
                href="mailto:rlaalsrb1111@naver.com"
              >
                rlaalsrb1111@naver.com
              </a>
            </li>
          </motion.ul>
        </div>
      </Container>
    </motion.div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'a a'
    'b c';

  h3 {
    width: fit-content;
    font-size: 40px;
    font-weight: 700;
    padding: 3px 50px 0 3px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin-bottom: 40px;
  }

  svg {
    margin-right: 10px;
    fill: ${(props) => props.theme.textColor};
  }

  a {
    opacity: 0.4;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    font-weight: 400;
  }

  .tech-stacks {
    grid-area: a;
  }

  .links {
    grid-area: b;
  }

  .contact {
    grid-area: c;
  }

  .links ul,
  .contact ul {
    display: flex;
    flex-direction: column;
  }

  .links li,
  .contact li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-top: 4px;
    font-weight: 700;
    font-size: 16px;
    line-height: 0.8;
  }

  em {
    margin-right: 6px;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export default TechStacks;
