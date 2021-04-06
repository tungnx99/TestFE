import { HttpParams } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'src/app/dtos/CategoryDto';
import { ProductDto, ProductDtoReturn } from 'src/app/dtos/productDto';
import { SupplierDto } from 'src/app/dtos/supplierDto';
import { CategoryAPI } from 'src/app/service/category.service';
import { ProductAPI } from 'src/app/service/product.service';
import { SupplierAPI } from 'src/app/service/supplier.service';
import {
  ModalHeaderModel,
  ModalFooterModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  id!: String;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;

  data!: ProductDtoReturn;

  dataCate: CategoryDto[] = [];
  dataSupplier: SupplierDto[] = [];
  indexCate!: number;
  indexSupplier!: number;

  constructor(
    private fb: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private apiProduct: ProductAPI,
    private apiCategory: CategoryAPI,
    private apiSupplier: SupplierAPI
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.id);
  }

  ngOnInit(): void {
    this.install();
  }

  callapi() {
    // this.apiCategory.getAll({}, {}).subscribe((e: any) => {
    //   if (e.status == 0) {
    //     this.dataCate = e.data;
    //   }
    // });
    // this.apiSupplier.getAll({}, {}).subscribe((e: any) => {
    //   if (e.status == 0) {
    //     this.dataSupplier = e.data;
    //   }
    // });
    this.indexCate = 1;
    this.indexSupplier = 1;
    this.callapicategory(this.indexCate);
    this.callapisupplier(this.indexSupplier);

    if (this.id) {
      this.apiProduct.getProductById(this.id).subscribe((e: any) => {
        if (e.status == 0) {
          this.data = e.data;
          this.updateValues(this.data);
        }
      });
    }
  }

  callapicategory(index: number) {
    var params = new HttpParams().set('pageIndex', index.toString());

    var header = {
      // Authorization: 'bearer ' + localStorage.getItem('token'),
    };

    this.apiCategory.getCategorys(params, header).subscribe((res: any) => {
      if (res.status == 0) {
        this.dataCate = this.dataCate.concat(res.data.results as CategoryDto[]);
      }
    });
  }

  callapisupplier(index: number) {
    var params = new HttpParams().set('pageIndex', index.toString());

    var header = {
      // Authorization: 'bearer ' + localStorage.getItem('token'),
    };

    this.apiSupplier.getSuppliers(params, header).subscribe((res: any) => {
      if (res.status == 0) {
        this.dataSupplier = this.dataSupplier.concat(
          res.data.results as SupplierDto[]
        );
      }
    });
  }

  install() {
    this.productForm = this.fb.group({
      categoryId: [this.data?.categoryId, [Validators.required]],
      supplierId: [this.data?.supplierId, [Validators.required]],
      name: [this.data?.name, [Validators.required]],
      description: [this.data?.description, [Validators.required]],
    });

    this.callapi();

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.id ? `[Update] ${this.id}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  updateValues(data: ProductDtoReturn) {
    this.productForm.setValue({
      categoryId: data.categoryId,
      supplierId: data.supplierId,
      name: data.name,
      description: data.description,
    });
  }

  addValuesCategory() {
    this.indexCate++;
    this.callapicategory(this.indexCate);
  }

  addValuesSupplier() {
    this.indexSupplier++;
    this.callapisupplier(this.indexSupplier);
  }

  save(event: any) {
    if (this.id) {
      this.update();
      return;
    }
    this.insert();
  }
  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  createFormData() {
    var data: ProductDto = this.productForm.value;
    var formData: any = new FormData();
    if (this.id) {
      formData.append('id', this.id);
    }
    formData.append('categoryId', data.categoryId);
    formData.append('supplierId', data.supplierId);
    formData.append('name', data.name);
    formData.append('description', data.description);

    return formData;
  }

  insert() {
    this.apiProduct.saveProduct(this.createFormData()).subscribe(
      (data) => {
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  update() {
    this.apiProduct.updateProduct(this.createFormData()).subscribe(
      (data) => {
        console.log(data);
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
