import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveForm1Component } from './reactive-form1/reactive-form1.component';
import { ViewDataComponent } from './view-data/view-data.component';

const routes: Routes = [
  { path: '', component: ReactiveForm1Component },
  { path: 'view-data', component: ViewDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
