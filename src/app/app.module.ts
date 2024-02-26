import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveForm1Component } from './reactive-form1/reactive-form1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDataComponent } from './view-data/view-data.component';
import { ReadJsonDataComponent } from './read-json-data/read-json-data.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveForm1Component,
    ViewDataComponent,
    ReadJsonDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
