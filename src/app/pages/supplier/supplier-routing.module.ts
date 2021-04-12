import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SupplierShowComponent,
        data: {
          title: "Supplier",
          breadcrumb: "Supplier"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliertRoutingModule { }
