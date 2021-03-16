import { cartInterface } from '../redux/slicers/cartSlicer';
import { useStylesType } from './Card/card.style';

export interface cardInterface {
  category: string;
  createdAt: string;
  description: string;
  images: Array<string>;
  prise: number;
  subtitle: string;
  title: string;
  categoryslug: string;
  detail?: string;
  slug: string;
  updatedAt: string;
  __v: number;
  _id: string;
  style?: useStylesType;
}

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
  cart: Array<cartInterface>;
  totalCartPrice: number;
}

export interface TabsCentrType {
  _id: string;
  title: string;
  meta: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
