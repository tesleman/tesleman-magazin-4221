import { CardScemaInterface } from '../api/models/cardScema';

export interface PropsSingleCard {
  message: string;
  data: CardScemaInterface;
}

export interface singleCard extends CardScemaInterface {}

export interface SingleCategoryI {
  context: string;
  message: string;

  cards: {
    pageLenght: number;
    totalCount: number;
    data: Array<CardScemaInterface>;
  };
}
