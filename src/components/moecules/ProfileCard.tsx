import styled from "styled-components";
import ProfileDescription from "../atoms/ProfileDescription";
import ProfileFicture from "../atoms/ProfilePicture";
import { motion } from "framer-motion";
import { appearFromBottom } from "@/styles/framer-motions";

const ProfileCardBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`

const ProfileCard = () => {
  return (
    <motion.div
      variants={appearFromBottom}
      initial='hidden'
      animate='visible'
    >
      <ProfileCardBox>
        <ProfileFicture />  
        <ProfileDescription />
      </ProfileCardBox>
    </motion.div>
  )
}

export default ProfileCard;