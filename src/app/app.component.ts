import { Component } from '@angular/core';
import { generateGridItems, generateGridItemsSubtitle, generateGridItemsDescription } from './grid-expander/grid-expander.test';
import { SAMPLES } from './samples.html';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-grid-expander';

  readonly SAMPLES = SAMPLES;

  // Demo 1 items with title
  items = generateGridItems(10);

  // Demo 2 items with title, subtitle
  itemsSubtitle = generateGridItemsSubtitle(12);

  // Demo 3 items with title, subtitle and description
  itemsDescription = generateGridItemsDescription(100);
}
