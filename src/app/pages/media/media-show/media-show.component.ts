import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { mediaDB } from 'src/app/shared/tables/media';

@Component({
  selector: 'app-media-show',
  templateUrl: './media-show.component.html',
  styleUrls: ['./media-show.component.scss'],
})
export class MediaShowComponent implements OnInit {
  public media: any;

  public dataImage: string[] = [];

  constructor(private http: HttpClient) {
    this.media = mediaDB.data;
  }

  public settings = {
    columns: {
      img: {
        title: 'Image',
        type: 'html',
      },
      file_name: {
        title: 'File Name',
      },
      url: {
        title: 'Url',
      },
    },
  };

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  ngOnInit() {}

  async onInputChange(event: any) {
    var file = new FormData();
    event.target.files.forEach((element: any) => {
      file.append('files', element);
      // var item = {
      //   img: `<img src='${URL.createObjectURL(element)}' class='imgTable'>`,
      //   file_name: 'Honor_Mobile.jpg',
      //   url: 'http://www.assets/images/product/product/13.jpg',
      // };
      // this.media.push(item);
    });

    await this.http.post<any>('https://localhost:44309/api/file', file).subscribe(
      (res: any) => {
        if(res.status == 0)
        {
          this.dataImage = res.data;
        }
      }
    );
  }
}
