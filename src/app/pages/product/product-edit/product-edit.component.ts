import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  item!: any;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;

  dataCate!: any;
  dataSupplier!: any;

  constructor(
    private fb: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private apiProduct: ProductAPI,
    private apiCategory: CategoryAPI,
    private apiSupplier: SupplierAPI
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.item);
  }

  ngOnInit(): void {
    this.install();
  }

  install() {
    this.apiCategory.getAll({}, {}).subscribe((e: any) => {
      if (e.status == 0) {
        this.dataCate = e.data;
      }
    });
    this.apiSupplier.getAll({}, {}).subscribe((e: any) => {
      if (e.status == 0) {
        this.dataSupplier = e.data;
      }
    });
    this.productForm = this.fb.group({
      id: [this.item ? this.item.id : '', [Validators.required]],
      categoryId: [
        this.item ? this.item.categoryId : '',
        [Validators.required],
      ],
      supplierId: [
        this.item ? this.item.supplierId : '',
        [Validators.required],
      ],
      name: [this.item ? this.item.name : '', [Validators.required]],
      description: [
        this.item ? this.item.description : '',
        [Validators.required],
      ],
    });
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.id}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save(event: any) {
    if (this.item) {
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
    var formData: any = new FormData();
    if (this.item) {
      formData.append('id', this.item.id);
    }
    formData.append('categoryId', this.productForm.get('categoryId')!.value);
    formData.append('supplierId', this.productForm.get('supplierId')!.value);
    formData.append('name', this.productForm.get('name')!.value);
    formData.append('description', this.productForm.get('description')!.value);

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
