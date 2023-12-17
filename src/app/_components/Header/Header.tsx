'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import SearchIcon from '@/app/_components/Icons/SearchIcon';

import ThemeToggle from './ThemeToggle/ThemeToggle';
import ScrollProgressBar from './ScrollProgressBar/ScrollProgressBar';
import { header, headerLink, headerRightSection, headerWrapper, search } from './Header.css';

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
    <header className={`${headerWrapper} ${visible ? '' : 'hide'}${position === 0 ? 'top' : ''}`}>
      <div className={header}>
        <div className="header-links">
          <Link href={'/'} className={`${headerLink} main-link`}>
            cobocho.dev
          </Link>
          <Link href={'/about'} className={`${headerLink} about`}>
            about
          </Link>
          <Link href={'/tags'} className={`${headerLink} tags`}>
            tags
          </Link>
        </div>
        <div className={headerRightSection}>
          <ThemeToggle />
          <Link href="/search" className={`${search} search`}>
            <SearchIcon />
          </Link>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
