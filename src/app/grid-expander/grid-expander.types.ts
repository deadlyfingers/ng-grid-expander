export interface IGridItem {
  title: string;
}

export interface IGridItemSubtitle extends IGridItem {
  subtitle: string;
}

export interface IGridItemDescription extends IGridItemSubtitle {
  subtitle: string;
  description: string;
}
