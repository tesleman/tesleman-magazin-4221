import { cartInterface } from '../redux/slicers/cartSlicer';

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
  cart: Array<cartInterface>;
  totalCartPrice: number;
}

export interface TabsCentrType {
  _id: string;
  title: string;
  meta?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface categoryI {
  _id: string;
  title: string;
  meta?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
export interface TopMenueIItemI {
  _id: string;
  subcat: Array<string>;
  title: string;
  slug: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  sort: number;
}
