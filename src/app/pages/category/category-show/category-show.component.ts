import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { range } from 'lodash';
import { CategoryDto } from 'src/app/dtos/CategoryDto';
import { CategoryAPI } from 'src/app/service/category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss'],
})
export class CategoryShowComponent implements OnInit {
  data!: any;
  params = {};
  header = {};
  closeResult = '';

  constructor(private api: CategoryAPI, private modalService: NgbModal) {}

  ngOnInit() {
    this.refresh();
  }

  get pagelist() {
    return this.data ? range(1, this.data.totalPage + 1) : [];
  }

  async refresh() {
    await this.api
      .getCategorys(this.params, this.header)
      .subscribe((res: any) => {
        if (res.status == 0) {
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
      this.api.deleteCategory(id).subscribe((e) => {
        console.log(e);
        this.refresh();
      });
    }
  }

  open(item: CategoryDto | null) {
    console.log(item);
    var modalRef = this.modalService.open(CategoryEditComponent, {
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
