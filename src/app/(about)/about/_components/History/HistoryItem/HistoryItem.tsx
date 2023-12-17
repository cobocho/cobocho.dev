import { useState } from 'react';
import OrchestrationAppearBottom from '@/app/_components/Motion/OrchestrationAppearBottom';
import { historyItemTitle, historyItemTitleBox, historyItemToggle } from './HistoryItem.css';

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
      <OrchestrationAppearBottom
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className={toggleMode ? 'toggle-mode' : ''}
      >
        <div className={historyItemTitleBox}>
          <p className={historyItemTitle}>{title}</p>
          {toggleMode && <span className={`${historyItemToggle} ${toggle ? 'toggle' : 'toggle-off'}`}>▴</span>}
        </div>
      </OrchestrationAppearBottom>
      {toggleMode ? toggle ? children : <></> : children}
    </div>
  );
};

export default HistoryItem;
