import { useStylesType } from './Card/card.style';

export interface TabItemInterface {
  images: Array<string>;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  style?: useStylesType;
}

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
}
