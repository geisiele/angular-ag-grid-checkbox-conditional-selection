import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
