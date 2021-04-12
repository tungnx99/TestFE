import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';
import { CategoryShowComponent } from './category-show/category-show.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryAPI } from 'src/app/service/category.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';  

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [CategoryShowComponent, CategoryEditComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
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
    CategoryAPI,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CategoryModule {}
