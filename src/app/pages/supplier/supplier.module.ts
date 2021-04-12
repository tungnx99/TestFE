import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuppliertRoutingModule } from './supplier-routing.module';
import { SupplierShowComponent } from './supplier-show/supplier-show.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierAPI } from 'src/app/service/supplier.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [SupplierShowComponent, SupplierEditComponent],
  imports: [
    CommonModule,
    SuppliertRoutingModule,
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
    SupplierAPI,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SupplierModule {}
