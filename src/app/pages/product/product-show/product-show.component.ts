import { APP_ID, Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { range } from 'lodash';
import { ProductAPI } from 'src/app/service/product.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
})
export class ProductShowComponent implements OnInit {
  data!: any;
  params = {};
  header = {};
  closeResult = '';

  constructor(private api: ProductAPI, private modalService: NgbModal) {}

  ngOnInit() {
    this.refresh();
  }

  get pagelist() {
    return this.data ? range(1, this.data.totalPage + 1) : [];
  }

  async refresh()
  {
    await this.api.getProducts(this.params, this.header).subscribe((res: any) => {
      if(res.status == 0)
      {
        this.data = res.data;
      }
    });
  }

  onPageIndexChange(pageNumber: number) {
    this.params = {
      pageNumber: pageNumber,
    };
    this.header = {
      // Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    this.refresh();
  }

  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteProduct(id).subscribe((e) => {
        console.log(e);
        this.refresh();
      });
    }
  }

  open(item: any) {
    console.log(item);
    var modalRef = this.modalService.open(ProductEditComponent, {
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
