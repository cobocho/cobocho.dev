import styled from "styled-components";
import ThemeButton from "../atoms/ThemeButton";
import { useRecoilState } from 'recoil';
import { ThemeFlag, themeState } from "@/stores/theme";

const ToggleBox = styled.div`
  width: 60px;
  height: 30px;
  padding: 2.5px;
  border-radius: 15px;
  background-color: #f9f9f9;

  &:hover {
    cursor: pointer;
  }
`

const ThemeToggle = () => {
  const [currentTheme, setTheme] = useRecoilState(themeState);

  function changeThemeHandler() {
    if (currentTheme === ThemeFlag.dark) setTheme(ThemeFlag.light);
    else setTheme(ThemeFlag.dark);
  }

  return (
    <ToggleBox onClick={changeThemeHandler}>
      <ThemeButton theme={currentTheme}/>
    </ToggleBox>
  )
}

export default ThemeToggle;