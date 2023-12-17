import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const companyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '30px',
});

export const blankCompany = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '24px',
  fill: Theme.content,
});

export const companyName = style({
  display: 'flex',
  gap: '6px',
  alignItems: 'flex-end',
  fontSize: '28px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
});

export const companyEnglishName = style({ fontSize: '20px', color: Theme.secondary, whiteSpace: 'normal' });

export const companyEmploymentPeriod = style({ fontSize: '20px', color: Theme.secondary });

export const companyPosition = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '4px',
  fontSize: '18px',
  color: Theme.secondary,
});

export const companyEnglishPosition = style({ whiteSpace: 'normal' });

export const companyWork = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '10px',
  fontSize: '15px',
  whiteSpace: 'break-spaces',
  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',
    },
  },
});

export const companyEnglishWork = style({
  color: Theme.secondary,
});
