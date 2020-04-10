import { IGridItem, IGridItemSubtitle, IGridItemDescription } from './grid-expander.types';

export const generateGridItems = (length: number): IGridItem[] => {
  return Array(length).fill(null).map((_, i) => ({ title: `title ${i + 1}` }));
};

export const generateGridItemsSubtitle = (length: number): IGridItemSubtitle[] => {
  return Array(length).fill(null).map((_, i) => ({ title: `title ${i + 1}`, subtitle: `value ${i + 1}`}));
};

export const generateGridItemsDescription = (length: number): IGridItemDescription[] => {
  return Array(length).fill(null).map((_, i) => ({ title: `title ${i + 1}`, subtitle: `value ${i + 1}`, description: `desc ${i + 1}` }));
};
