import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {KonvaModule} from 'ng2-konva';
import { Observable, of, fromEvent} from 'rxjs';


import { AppComponent } from './app.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component
  ],
  imports: [
    BrowserModule,
    KonvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
