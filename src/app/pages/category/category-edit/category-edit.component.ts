import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'src/app/dtos/CategoryDto';
import { ProductDto } from 'src/app/dtos/productDto';
import { CategoryAPI } from 'src/app/service/category.service';
import { ProductAPI } from 'src/app/service/product.service';
import {
  ModalHeaderModel,
  ModalFooterModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  productForm!: FormGroup;
  item!: CategoryDto;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;

  constructor(
    private fb: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private api: CategoryAPI
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.item);
  }

  ngOnInit(): void {
    this.install();
  }

  install() {
    this.productForm = this.fb.group({
      id: [this.item ? this.item.id : '', [Validators.required]],
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
    var item : ProductDto = this.productForm.value;
    var formData: any = new FormData();
    if (this.item) {
      formData.append('id', item.id);
    }
    formData.append('name', item.name);
    formData.append('description', item.description);

    return formData;
  }

  insert() {
    this.api.saveCategory(this.createFormData()).subscribe(
      (data) => {
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  update() {
    this.api.updateCategory(this.createFormData()).subscribe(
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
