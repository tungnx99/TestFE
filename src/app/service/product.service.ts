import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class ProductAPI extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getProducts(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/product`, {
      params: params,
      headers: headers,
    });
  }

  saveProduct(body: FormData) {
    return this.post<any>(`${environment.host}/api/product`, body);
  }

  updateProduct(body: FormData) {
    return this.put<any>(`${environment.host}/api/product`, body);
  }

  deleteProduct(body: any) {
    return this.deleteWithId(`${environment.host}/api/product`, body.toString());
  }
}
