import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaShowComponent } from './media-show/media-show.component';
import { MediaRoutingModule } from './media-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [MediaShowComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
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
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class MediaModule {}
