'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SearchIcon from '@/app/_components/Icons/SearchIcon';
import { useModal } from '@/hooks/useModal';
import Post from '@/types/post';

import SearchModal from '../Modals/SearchModal/SearchModal';
import { header, headerLink, headerRightSection, headerWrapper, search } from './Header.css';
import ScrollProgressBar from './ScrollProgressBar/ScrollProgressBar';
import ThemeToggle from './ThemeToggle/ThemeToggle';

interface Props {
  posts: Post[];
}

const Header = ({ posts }: Props) => {
  const [position, setPosition] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const { open, toggleModal } = useModal();

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

  const openSearchModal = () => {
    toggleModal();
  };

  return (
    <>
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
            <button data-testid="search" onClick={openSearchModal} className={`${search} search`}>
              <SearchIcon />
            </button>
          </div>
        </div>
        <ScrollProgressBar />
      </header>
      {open && <SearchModal posts={posts} />}
    </>
  );
};

export default Header;
