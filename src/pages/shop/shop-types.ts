export interface PropsSingleCard {
  message: string;
  data: singleCard;
}

export interface singleCard {
  category: string;
  createdAt: string;
  description: string;
  images: Array<string>;
  price: number;
  subtitle: string;
  title: string;
  detail?: string;
  slug: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface SingleCategoryI {
  context: string;
  message: string;

  cards: {
    pageLenght: number;
    totalCount: number;
    data: Array<singleCard>;
  };
}
