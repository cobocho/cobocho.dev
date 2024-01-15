import { useState } from 'react';
import { historyItemTitle, historyItemTitleBox, historyItemToggle } from './HistoryItem.css';
import AppearBottom from '@/app/_components/Motion/AppearBottom';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  toggleMode?: boolean;
}

const HistoryItem = ({ title, children, className, toggleMode }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className={className ? className : ''}>
      <AppearBottom
        isOrchestration
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={toggleMode ? 'toggle-mode' : ''}
      >
        <div className={historyItemTitleBox}>
          <p className={historyItemTitle}>{title}</p>
          {toggleMode && <span className={`${historyItemToggle} ${toggle ? 'toggle' : 'toggle-off'}`}>▴</span>}
        </div>
      </AppearBottom>
      {toggleMode ? toggle ? children : <></> : children}
    </div>
  );
};

export default HistoryItem;
