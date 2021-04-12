import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAPI } from 'src/app/service/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [ProductShowComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    DropzoneModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    ProductAPI,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProductModule { }
