import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { ThemeFlag, currentThemeState } from '@/stores/theme';

import ThemeButton from './ThemeButton';

const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.togglerColor};
  box-shadow: ${(props) => props.theme.togglerShadow};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .icons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 6px;
  }

  .material-symbols-outlined {
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 40;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  function changeThemeHandler() {
    if (currentTheme === ThemeFlag.dark) {
      setCurrentTheme(ThemeFlag.light);
      localStorage.setItem('dark_mode', String(ThemeFlag.light));
    } else {
      setCurrentTheme(ThemeFlag.dark);
      localStorage.setItem('dark_mode', String(ThemeFlag.dark));
    }
  }

  return (
    <ToggleBox onClick={changeThemeHandler}>
      <div className="icons">
        <span className="material-symbols-outlined">clear_night</span>
        <span className="material-symbols-outlined">clear_day</span>
      </div>
      <ThemeButton currentTheme={currentTheme} />
    </ToggleBox>
  );
};

export default ThemeToggle;
