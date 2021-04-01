import { HttpParams } from '@angular/common/http';
import { APP_ID, Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep, range } from 'lodash';
import { CategoryAPI } from 'src/app/service/category.service';
import { ProductAPI } from 'src/app/service/product.service';
import { SupplierAPI } from 'src/app/service/supplier.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
})
export class ProductShowComponent implements OnInit {
  data!: any;
  params!: HttpParams;
  header = {};
  closeResult = '';

  keyNameProduct = '';
  keyNameCategory = '';
  keyNameSupplier = '';

  dataCate!: any;
  dataSupplier!: any;

  constructor(
    private apiProduct: ProductAPI,
    private apiCategory: CategoryAPI,
    private apiSupplier: SupplierAPI,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.refresh();
  }

  searchNameCategorybyID(id: string)
  {
    return this.dataCate.filter((x:any) => x.id === id)[0].name;
  }

  searchNameSupplierbyID(id: string)
  {
    return this.dataSupplier.filter((x:any) => x.id === id)[0].name;
  }

  get pagelist() {
    return this.data ? range(1, this.data.totalPage + 1) : [];
  }

  async refresh() {
    await this.apiCategory.getAll({}, {}).subscribe((e: any) => {
      if (e.status == 0) {
        this.dataCate = e.data;
      }
    });
    await this.apiSupplier.getAll({}, {}).subscribe((e: any) => {
      if (e.status == 0) {
        this.dataSupplier = e.data;
      }
    });
    await this.apiProduct
      .getProducts(this.params, this.header)
      .subscribe((res: any) => {
        if (res.status == 0) {
          this.data = res.data;
        }
      });
  }

  onPageIndexChange(pageNumber: number) {
    this.params = new HttpParams().set('pageIndex', pageNumber.toString());

    this.header = {
      // Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    this.refresh();
  }

  delete(id: string) {
    if (confirm('Are you sure?')) {
      this.apiProduct.deleteProduct(id).subscribe((e) => {
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

  public onSearch() {
    this.params = new HttpParams();

    if (this.keyNameProduct) {
      this.params = this.params.set('search.name', this.keyNameProduct);
    }

    if (this.keyNameCategory) {
      this.params = this.params.set(
        'search.category.name',
        this.keyNameCategory
      );
    }

    if (this.keyNameSupplier) {
      this.params = this.params.set(
        'search.supplier.name',
        this.keyNameSupplier
      );
    }

    console.log(this.params.get('search.name'));
    this.refresh();
  }
}
