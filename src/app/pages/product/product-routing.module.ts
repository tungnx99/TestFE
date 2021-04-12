import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductShowComponent } from './product-show/product-show.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductShowComponent,
        data: {
          title: "Product",
          breadcrumb: "Product"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
