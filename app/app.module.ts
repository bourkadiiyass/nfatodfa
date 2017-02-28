import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { TransitComponent }  from './transit.component';
import { ArrayService }  from './ArrayService';
import { DrawService }  from './DrawService';
import { ReactiveFormsModule }  from '@angular/forms';
import { Machine } from './ConversionService';


@NgModule({
  imports:      [ BrowserModule,
                  ReactiveFormsModule ],
  declarations: [ AppComponent, TransitComponent],
  providers: [ArrayService, DrawService, Machine],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
