import React from 'react';
import ProfileCard from './_components/ProfileCard/ProfileCard';
import History from './_components/History/History';
import { BASIC_THUMBNAIL, DOMAIN } from '@/constants/domain';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  const title = `About | ${DOMAIN}`;
  const description = `Tell me about`;
  const images = [BASIC_THUMBNAIL];

  return {
    title,
    metadataBase: new URL(`https://${DOMAIN}`),
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  };
};

const About = () => {
  return (
    <>
      <ProfileCard />
      <History />
    </>
  );
};

export default About;
