import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class ProductAPI extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getProducts(params: HttpParams, headers: {}) {
    return this.get<any>(`${environment.host}/api/product`, {
      params,
      headers: headers,
    });
  }

  getProductById(id: String) {
    return this.get<any>(`${environment.host}/api/product/getbyid`, {
      params: new HttpParams().append('id', id.toString()),
    });
  }

  saveProduct(body: FormData) {
    return this.post<any>(`${environment.host}/api/product`, body);
  }

  updateProduct(body: FormData) {
    return this.put<any>(`${environment.host}/api/product`, body);
  }

  deleteProduct(body: any) {
    return this.deleteWithId(
      `${environment.host}/api/product`,
      body.toString()
    );
  }
}
