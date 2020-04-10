import { Component, Input, TemplateRef } from '@angular/core';
import { IGridItem } from './grid-expander.types';
import { Labels, Default } from './grid-expander.common';

@Component({
  selector: 'app-grid-expander',
  templateUrl: './grid-expander.component.html',
  styleUrls: ['./grid-expander.component.scss'],
})
export class GridExpanderComponent {
  @Input() grid: string[] = ['col-xs-12', 'col-sm-4']; // flexboxgrid.com classes
  @Input() limit = Default.Limit;
  @Input() showMore = true;
  @Input() items: IGridItem[] = [];
  @Input() template: TemplateRef<IGridItem>;

  public get displayItems(): IGridItem[] {
    if (!this.items) { return []; }
    return this.showMore ? this.items.slice(0, this.limit) : this.items;
  }

  public get buttonLabel(): string {
    return this.showMore ? Labels.More : Labels.Less ;
  }

  public get hasItemsGreaterThanLimit(): boolean {
    return this.items && this.items.length > this.limit ;
  }

  public clickMore(): void  {
    this.showMore = !this.showMore;
  }
}
