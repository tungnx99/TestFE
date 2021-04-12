import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryShowComponent } from './category-show/category-show.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryShowComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
