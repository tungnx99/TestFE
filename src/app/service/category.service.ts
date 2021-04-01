import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class CategoryAPI extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getCategorys(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/category`, {
      params: params,
      headers: headers,
    });
  }

  getAll(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/category/all`, {
      params: params,
      headers: headers,
    });
  }

  saveCategory(body: FormData) {
    return this.post<any>(`${environment.host}/api/category`, body);
  }

  updateCategory(body: FormData) {
    return this.put<any>(`${environment.host}/api/category`, body);
  }

  deleteCategory(body: any) {
    return this.deleteWithId(`${environment.host}/api/category`, body.toString());
  }
}
