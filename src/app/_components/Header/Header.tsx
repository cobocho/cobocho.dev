'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import SearchIcon from '@/app/_components/Icons/SearchIcon';

import ThemeToggle from './ThemeToggle/ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar/ScrollProgressBar';
import LAYOUT_VARIABLES from '@/styles/layout-variables';

const Header = () => {
  const [position, setPosition] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  return (
    <Container className={`${visible ? '' : 'hide'}${position === 0 ? 'top' : ''}`}>
      <div className="header-wrapper">
        <div className="header-links">
          <Link href={'/'} className="main-link">
            cobocho.dev
          </Link>
          <Link href={'/about'} className="about">
            about
          </Link>
          <Link href={'/tags'} className="tags">
            tags
          </Link>
        </div>
        <div className="right-header-section">
          <ThemeToggle />
          <Link href="/search" className="search">
            <SearchIcon />
          </Link>
        </div>
      </div>
      <ScrollProgressBar />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;

  position: sticky;
  top: 0;
  left: 0;

  width: 100vw;
  height: ${LAYOUT_VARIABLES.headerHeight};

  background-color: rgba(0, 0, 0, 0.813);

  z-index: ${LAYOUT_VARIABLES.headerZIndex};

  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  font-weight: 300;
  color: #fff;

  transition: all 0.5s;

  &.hide {
    top: -${LAYOUT_VARIABLES.headerZIndex};
    box-shadow: none;
  }

  &.top {
    box-shadow: none;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;

    width: 900px;
    height: 100%;

    margin: 0 auto;

    overflow: hidden;

    .header-links {
      a {
        margin-right: 30px;

        font-size: 20px;
        color: #fff;

        transition: color 0.3s;

        &:hover {
          color: #acacac;
        }
      }

      .main-link {
        font-size: 32px;
        margin-right: 30px;
      }
    }

    .right-header-section {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      svg:hover {
        cursor: pointer;
      }

      .search {
        position: relative;
        top: 3px;

        fill: #fff;

        transition: fill 0.3s;

        &:hover {
          fill: #acacac;
        }
      }
    }

    .scroll-progress-bar {
      position: absolute;
      bottom: 0;
      width: 100%;

      transform-origin: left;
    }
  }

  @media (max-width: ${LAYOUT_VARIABLES.breakPoint}) {
    .header-wrapper {
      padding: 0 20px;

      .header-links {
        a {
          font-size: 16px;
          margin-right: 10px;
          transition: transform 0.3s;
        }

        .main-link {
          font-size: 24px;
          margin-right: 15px;
        }
      }
    }
  }
`;

export default Header;
