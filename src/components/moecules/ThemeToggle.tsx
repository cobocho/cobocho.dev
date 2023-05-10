import styled from "styled-components";
import ThemeButton from "../atoms/ThemeButton";
import { useRecoilState } from 'recoil';
import { ThemeFlag, themeState } from "@/stores/theme";

const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: #e3e3e3;
  box-shadow: inset 6px 6px 5px #c3c3c3,
            inset -6px -6px 5px #fdfdfd;

  .icons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 6px;
  }

  .material-symbols-outlined {
    color: #2e2e2e;
    font-size: 20px;
    font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 40
  }

  &:hover {
    cursor: pointer;
  }
`

const ThemeToggle = () => {
  const [currentTheme, setTheme] = useRecoilState(themeState);

  function changeThemeHandler() {
    if (currentTheme === ThemeFlag.dark) {
      setTheme(ThemeFlag.light);
      localStorage.setItem('dark_mode', String(ThemeFlag.light));
    }
    else {
      setTheme(ThemeFlag.dark);
      localStorage.setItem('dark_mode', String(ThemeFlag.dark));
    }
  }

  return (
    <ToggleBox onClick={changeThemeHandler}>
      <div className='icons'>
        <span className='material-symbols-outlined'>
          clear_night
        </span>
        <span className='material-symbols-outlined'>
          clear_day
        </span>
      </div>
      <ThemeButton currentTheme={currentTheme}/>
    </ToggleBox>
  )
}

export default ThemeToggle;