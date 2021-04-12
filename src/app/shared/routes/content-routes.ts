import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'category',
    loadChildren: () => import('../../pages/category/category.module').then(m => m.CategoryModule),
    // data: {
    //   breadcrumb: "Categories"
    // }
  },
  {
    path: 'product',
    loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductModule),
    // data: {
    //   breadcrumb: "Products"
    // }
  },
  {
    path: 'supplier',
    loadChildren: () => import('../../pages/supplier/supplier.module').then(m => m.SupplierModule),
    // data: {
    //   breadcrumb: "Suppliers"
    // }
  },
  {
    path: 'media',
    loadChildren: () => import('../../pages/media/media.module').then(m => m.MediaModule),
  },
];