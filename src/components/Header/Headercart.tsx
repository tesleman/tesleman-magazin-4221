import React from 'react';
import { useSelector } from 'react-redux';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useStyles, useStylesType } from './header.style';
import { Badge } from '@material-ui/core';
import AlignItemsList from '../AlignItemsList';
import { RootState } from '../import-export';

export default function Headercart() {
  const style: useStylesType = useStyles();
  const [AlignItemsListState, setAlignItemsList] = React.useState(false);
  const ref = React.useRef();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);

  const hendlSetAlignItemsList = React.useCallback(() => {
    setAlignItemsList(!AlignItemsListState);
  }, [AlignItemsListState]);
  return (
    <div className={style.HeadercartRoot}>
      <Badge badgeContent={cart.length} showZero color="secondary">
        <LocalMallIcon
          ref={ref}
          onClick={hendlSetAlignItemsList}
          className={style.HeadercartIcon}
        />
      </Badge>
      {AlignItemsListState && (
        <AlignItemsList cart={cart} mYref={ref} hendlSetAlignItemsList={hendlSetAlignItemsList} />
      )}
    </div>
  );
}
