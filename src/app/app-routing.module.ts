import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CategoryShowComponent } from './pages/category/category-show/category-show.component';
import { ProductShowComponent } from './pages/product/product-show/product-show.component';
import { SupplierShowComponent } from './pages/supplier/supplier-show/supplier-show.component';

const routes: Routes = [
  { path: 'product', component: ProductShowComponent },
  { path: 'category', component: CategoryShowComponent },
  { path: 'supplier', component: SupplierShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
})
export class AppRoutingModule {}
