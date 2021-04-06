import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { range } from 'lodash';
import { SupplierDto } from 'src/app/dtos/supplierDto';
import { CategoryAPI } from 'src/app/service/category.service';
import { SupplierAPI } from 'src/app/service/supplier.service';
import { CategoryEditComponent } from '../../category/category-edit/category-edit.component';
import { SupplierEditComponent } from '../supplier-edit/supplier-edit.component';

@Component({
  selector: 'app-supplier-show',
  templateUrl: './supplier-show.component.html',
  styleUrls: ['./supplier-show.component.scss']
})
export class SupplierShowComponent implements OnInit {

  data!: any;
  params = {};
  header = {};
  closeResult = '';

  constructor(private api: SupplierAPI, private modalService: NgbModal) {}

  ngOnInit() {
    this.refresh();
  }

  get pagelist() {
    return this.data ? range(1, this.data.totalPage + 1) : [];
  }

  async refresh()
  {
    await this.api.getSuppliers(this.params, this.header).subscribe((res: any) => {
      if(res.status == 0)
      {
        this.data = res.data;
      }
    });
  }

  onPageIndexChange(pageNumber: number) {
    this.params = {
      pageIndex: pageNumber,
    };
    this.header = {
      // Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    this.refresh();
  }

  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteSupplier(id).subscribe((e) => {
        console.log(e);
        this.refresh();
      });
    }
  }

  open(item: SupplierDto| null) {
    console.log(item);
    var modalRef = this.modalService.open(SupplierEditComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.refresh();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
