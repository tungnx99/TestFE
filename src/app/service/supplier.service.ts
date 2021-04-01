import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class SupplierAPI extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getSuppliers(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/supplier`, {
      params: params,
      headers: headers,
    });
  }

  getAll(params: {}, headers: {}) {
    return this.get<any>(`${environment.host}/api/supplier/all`, {
      params: params,
      headers: headers,
    });
  }

  saveSupplier(body: FormData) {
    return this.post<any>(`${environment.host}/api/supplier`, body);
  }

  updateSupplier(body: FormData) {
    return this.put<any>(`${environment.host}/api/supplier`, body);
  }

  deleteSupplier(body: any) {
    return this.deleteWithId(`${environment.host}/api/supplier`, body.toString());
  }
}
