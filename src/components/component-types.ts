export interface TabItemInterface {
  images: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

export interface AlignItemsListInterface {
  hendlSetAlignItemsList: () => void;
  mYref: { current: HTMLElement & SVGElement };
}
