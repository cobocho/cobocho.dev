import Image from 'next/image';

import profile_picture from '../../../../../../../public/assets/profile/profile_picture.png';
import { profilePicture } from './ProfilePicture.css';

const ProfilePicture = () => {
  return (
    <div className={profilePicture}>
      <Image src={profile_picture} alt="profile" placeholder="blur" fill sizes="100%" loading="lazy" />
    </div>
  );
};

export default ProfilePicture;
