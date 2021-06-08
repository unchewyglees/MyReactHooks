import * as React from 'react';

export default function useAnchorEl(params:IUseAnchorElParams): IUseAnchorElProps {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | EventTarget | null>(null);

  const onClick = (event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget || event.target);
    if (params && params.onClick) {
      params.onClick(event);
    }
  };
  const onClose = () => { setAnchorEl(null); };

  return {
    anchorEl,
    isAnchored: Boolean(anchorEl),
    onClick, onClose,
  };
}

interface IUseAnchorElParams {
  onClick?(event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>): void;
}

interface IUseAnchorElProps {
  anchorEl: HTMLElement | EventTarget | null;
  isAnchored: boolean;
  onClick(event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>): void;
  onClose(): void;
}
