import { useStylesType } from './Card/card.style';

export interface TabItemInterface {
  images: Array<string>;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  style?: useStylesType;
  _id: string;
}

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
}

export interface TabsCentrType {
  _id: string;
  title: string;
  meta: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface apiFechInterface {
  category?: string;
  page: number;
  limit: number;
  table: string;
}
