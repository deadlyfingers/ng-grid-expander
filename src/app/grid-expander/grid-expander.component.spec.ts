import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridExpanderComponent } from './grid-expander.component';
import { generateGridItems, generateGridItemsSubtitle } from './grid-expander.test';
import { Labels, Default } from './grid-expander.common';
import { IGridItem, IGridItemSubtitle } from './grid-expander.types';
import { Component } from '@angular/core';

describe('GridExpanderComponent', () => {
  let component: GridExpanderComponent;
  let fixture: ComponentFixture<GridExpanderComponent>;
  let element: HTMLElement;

  const get = {
    button: () => element.querySelector('button'),
    columns: () => element.querySelectorAll('.row > div'),
    titles: () => element.querySelectorAll('.row > div > .title'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridExpanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridExpanderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  const populate = (total: number, limit: number = Default.Limit): IGridItem[] => {
    const items = generateGridItems(total);
    component.limit = limit;
    component.items = items;
    fixture.detectChanges();
    return items;
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create if items undefined', () => {
    component.items = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display items less than limit', () => {
    expect(component.hasItemsGreaterThanLimit).toBeFalsy();
    const limit = 9;
    const items = populate(8, limit);
    expect(component.hasItemsGreaterThanLimit).toBeFalsy();
    expect(component.displayItems.length).toBe(items.length);
    expect(component.displayItems.length).toBeLessThan(limit);
  });

  it('should display items equal to limit', () => {
    expect(component.hasItemsGreaterThanLimit).toBeFalsy();
    const limit = 9;
    populate(9, limit);
    expect(component.hasItemsGreaterThanLimit).toBeFalsy();
    expect(component.displayItems.length).toEqual(limit);
  });

  it('should limit display items', () => {
    expect(component.hasItemsGreaterThanLimit).toBeFalsy();
    const limit = 9;
    populate(10, limit);
    expect(component.hasItemsGreaterThanLimit).toBeTruthy();
    expect(component.displayItems.length).toBe(limit);
    expect(component.items.length).toBeGreaterThan(limit);
  });

  it('should handle button click', () => {
    const limit = 9;
    populate(10, limit);

    const spy = spyOn(component, 'clickMore');
    const button = get.button();
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it(`should toggle button labels '${Labels.More}' and '${Labels.Less}' and render all items using default template`, () => {
    const limit = 9;
    const items = populate(10, limit);
    expect(component.displayItems.length).toBe(limit);

    const limitedTitles = get.titles();
    expect(limitedTitles.length).toEqual(limit);
    expect(limitedTitles.length).toBeLessThanOrEqual(items.length);
    limitedTitles.forEach((title, i) => {
      expect(title.textContent).toBe(items[i].title);
    });

    const button = get.button();
    expect(button).toBeTruthy();
    expect(button.textContent).toBe(Labels.More);
    expect(component.buttonLabel).toBe(Labels.More);
    expect(component.showMore).toBeTruthy();

    button.click();
    fixture.detectChanges();
    expect(button.textContent).toBe(Labels.Less);
    expect(component.buttonLabel).toBe(Labels.Less);
    expect(component.showMore).toBeFalsy();
    expect(component.displayItems.length).toBe(items.length);

    const titles = get.titles();
    expect(titles.length).toEqual(items.length);
    titles.forEach((title, i) => {
      expect(title.textContent).toBe(items[i].title);
    });
  });

  it('should support multiple grid classes', () => {
    populate(2);
    const gridClasses = ['col-xs-12', 'col-sm-8', 'col-md-6', 'col-lg-4'];
    component.grid = gridClasses;
    fixture.detectChanges();
    const columns = get.columns();
    columns.forEach(column => {
      expect(column.classList.toString()).toBe(gridClasses.join(' '));
    });
  });

});

@Component({
  selector: 'app-test-template',
  template: `
<ng-template #templateSubtitle let-item="item">
  <h2 class="title">{{item.title}}</h2>
  <p class="subtitle">{{item.subtitle}}</p>
</ng-template>
<app-grid-expander [items]="itemsSubtitle" [template]="templateSubtitle"></app-grid-expander>
`,
})
class TestTemplateComponent {
  itemsSubtitle: IGridItemSubtitle[] = [];
}

describe('GridExpanderComponent Custom Template Items', () => {
  let component: TestTemplateComponent;
  let fixture: ComponentFixture<TestTemplateComponent>;
  let element: HTMLElement;

  const get = {
    titles: () => element.querySelectorAll('.row > div > .title'),
    subtitles: () => element.querySelectorAll('.row > div > .subtitle'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTemplateComponent, GridExpanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTemplateComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('app-grid-expander');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create \'app-grid-expander\' element', () => {
    expect(element).toBeTruthy();
  });

  it('should render using custom template items', () => {
    const limit = Default.Limit;
    const items = generateGridItemsSubtitle(100);
    component.itemsSubtitle = items;
    fixture.detectChanges();

    const titles = get.titles();
    expect(titles.length).toEqual(limit);
    titles.forEach((title, i) => {
      expect(title.textContent).toBe(items[i].title);
    });

    const subtitles = get.subtitles();
    expect(subtitles.length).toEqual(limit);
    subtitles.forEach((subtitle, i) => {
      expect(subtitle.textContent).toBe(items[i].subtitle);
    });
  });

});
