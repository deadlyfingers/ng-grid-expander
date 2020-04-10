import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridExpanderModule } from './grid-expander/grid-expander.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GridExpanderModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
