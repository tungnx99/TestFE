import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierDto } from 'src/app/dtos/supplierDto';
import { SupplierAPI } from 'src/app/service/supplier.service';
import {
  ModalHeaderModel,
  ModalFooterModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss'],
})
export class SupplierEditComponent implements OnInit {
  productForm!: FormGroup;
  item!: SupplierDto;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;

  constructor(
    private fb: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private api: SupplierAPI
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
    this.item = this.productForm.value;
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
    formData.append('name', this.item.name);
    formData.append('description', this.item.description);

    return formData;
  }

  insert() {
    this.api.saveSupplier(this.createFormData()).subscribe(
      (data) => {
        this.ngbActiveModal.close();
      },
      (e) => {
        console.log(e);
      }
    );
  }

  update() {
    this.api.updateSupplier(this.createFormData()).subscribe(
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
