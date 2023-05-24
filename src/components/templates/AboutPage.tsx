import styled from "styled-components";
import ProfileCard from "../moecules/ProfileCard";
import TechStacks from "../moecules/TechStacks";

const AboutPageBox = styled.section`
`

const AboutPage = () => {
  return (
    <AboutPageBox>
      <ProfileCard />
      <TechStacks />
    </AboutPageBox>
  )
}

export default AboutPage;