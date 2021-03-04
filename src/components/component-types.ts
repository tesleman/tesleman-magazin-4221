import { cartInterface } from '../redux/slicers/cartSlicer';
import { useStylesType } from './Card/card.style';

export interface cardInterface {
  images: Array<string>;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  style?: useStylesType;
  _id: string;
  price: number;
}

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
  cart: Array<cartInterface>;
}

export interface TabsCentrType {
  _id: string;
  title: string;
  meta: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
