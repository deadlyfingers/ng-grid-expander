import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridExpanderComponent } from './grid-expander.component';

@NgModule({
  declarations: [
    GridExpanderComponent,
  ],
  exports: [
    GridExpanderComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class GridExpanderModule { }
