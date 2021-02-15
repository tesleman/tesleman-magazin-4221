import React from 'react';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useStyles, useStylesType } from './header.style';
import { Badge } from '@material-ui/core';
import AlignItemsList from '../AlignItemsList';
export default function Headercart() {
  const style: useStylesType = useStyles();
  const [AlignItemsListState, setAlignItemsList] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    console.log(ref);
    return () => {};
  }, []);
  const hendlSetAlignItemsList = React.useCallback(() => {
    setAlignItemsList(!AlignItemsListState);
  }, [AlignItemsListState]);
  return (
    <div className={style.HeadercartRoot}>
      <Badge badgeContent={4} color="secondary">
        <LocalMallIcon
          ref={ref}
          onClick={hendlSetAlignItemsList}
          className={style.HeadercartIcon}
        />
      </Badge>
      {AlignItemsListState && (
        <AlignItemsList mYref={ref} hendlSetAlignItemsList={hendlSetAlignItemsList} />
      )}
    </div>
  );
}
