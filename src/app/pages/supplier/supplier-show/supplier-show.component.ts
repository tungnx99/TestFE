import { HttpParams } from '@angular/common/http';
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
  styleUrls: ['./supplier-show.component.scss'],
})
export class SupplierShowComponent implements OnInit {
  data!: any;
  params!: HttpParams;
  header = {};
  closeResult = '';

  keyName = '';
  keyDescription = '';

  constructor(private api: SupplierAPI, private modalService: NgbModal) {
    this.params = new HttpParams();
  }

  ngOnInit() {
    this.refresh();
  }

  get pagelist() {
    if (!this.data) {
      return [];
    }
    if (this.data.totalPage < 5) {
      return range(1, this.data.totalPage + 1);
    }
    if (this.data.pageIndex <= 2) {
      return range(1, 5);
    }
    if (this.data.pageIndex > this.data.totalPage - 2) {
      return range(this.data.totalPage - 3, this.data.totalPage + 1);
    }
    return this.data
      ? range(this.data.pageIndex - 1, this.data.pageIndex + 3)
      : [];
  }

  async refresh() {
    await this.api
      .getSuppliers(this.params, this.header)
      .subscribe((res: any) => {
        if (res.status == 0) {
          this.data = res.data;
        }
      });
  }

  onPageIndexChange(pageNumber: number) {
    this.params = this.params.set('pageIndex', pageNumber.toString());
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

  open(item: SupplierDto | null) {
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

  public settings = {
    hideSubHeader: true,
    // pager: {
    //   display: true,
    //   perPage: 5,
    // },
    actions: {
      // columnTitle: '',
      custom: [
        {
          name: 'editAction',
          title:
            '<a class="ng2-smart-action ng2-smart-action-edit-edit ng-star-inserted">Edit</a>',
        },
        {
          name: 'deleteAction',
          title:
            '<a class="ng2-smart-action ng2-smart-action-delete-delete ng-star-inserted">Delete</a>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      // id: {
      //   title: 'ID',
      // },
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
    },
  };

  onCustom(event: any) {
    console.log(event.action);
    if (event.action == 'editAction') {
      this.open(event.data);
    }
    if (event.action == 'deleteAction') {
      this.delete(event.data.id);
    }
  }

  onSearch() {
    this.params = new HttpParams();

    if (this.keyName) {
      this.params = this.params.set('search.name', this.keyName);
    }

    if (this.keyDescription) {
      this.params = this.params.set('search.description', this.keyDescription);
    }

    this.refresh();
  }
}
