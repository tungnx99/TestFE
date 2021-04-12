import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaShowComponent } from './media-show/media-show.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MediaShowComponent,
        data: {
          title: "Media",
          breadcrumb: "Media"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
