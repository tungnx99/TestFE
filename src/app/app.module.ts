import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';

import { enableProdMode } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryShowComponent } from './pages/category/category-show/category-show.component';
import { ProductShowComponent } from './pages/product/product-show/product-show.component';
import { SupplierShowComponent } from './pages/supplier/supplier-show/supplier-show.component';
import { ProductAPI } from './service/product.service';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CategoryAPI } from './service/category.service';
import { SupplierAPI } from './service/supplier.service';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';
import { SupplierEditComponent } from './pages/supplier/supplier-edit/supplier-edit.component';
registerLocaleData(en);
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    CategoryShowComponent,
    ProductShowComponent,
    SupplierShowComponent,
    ProductEditComponent,
    CategoryEditComponent,
    SupplierEditComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    CommonModule,
    NzPaginationModule,
    NzListModule,
    NzCardModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NzSelectModule 
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ProductAPI, CategoryAPI, SupplierAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
