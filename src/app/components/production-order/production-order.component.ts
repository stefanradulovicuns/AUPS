import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductionOrder } from 'src/app/models/productionOrder';
import { ProductionOrderService } from 'src/app/services/production-order.service';

@Component({
  selector: 'app-production-order',
  templateUrl: './production-order.component.html',
  styleUrls: ['./production-order.component.css']
})
export class ProductionOrderComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  productionOrders: ProductionOrder[] | null = null;
  productionOrdersTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'StartDate';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    productionOrderId: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    quantity: ['', Validators.required],
    note: [0],
    employeeId: ['', Validators.required],
    objectOfLaborId: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private productionOrderService: ProductionOrderService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProductionOrders();
  }

  getProductionOrders() {
    this.isLoading = true;
    this.productionOrderService.getProductionOrders(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.productionOrders = data;
        this.productionOrdersTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }

  createProductionOrder(productionOrder: ProductionOrder) {
    this.productionOrderService.createProductionOrder(productionOrder).subscribe({
      next: () => {
        this.getProductionOrders();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi nalog za proizvodnju';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateProductionOrder(productionOrder: ProductionOrder) {
    this.productionOrderService.updateProductionOrder(productionOrder).subscribe({
      next: () => {
        this.getProductionOrders();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno izmenjeni podaci';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  deleteProductionOrder(id: string) {
    this.productionOrderService.deleteProductionOrder(id).subscribe({
      next: () => {
        this.getProductionOrders();
        this.modalReference?.close();
        this.toastMessage = 'Nalog za proizvodnju je uspešno obrisan';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  open(content: any) {
    this.isSubmitted = false;
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onInputSearch() {
    this.page = 1;
    this.getProductionOrders();
  }

  onClickRow(productionOrder: ProductionOrder) {
    const { totalCount, ...productionOrderData } = productionOrder;
    this.formGroup.setValue({ ...productionOrderData });
    this.formGroup.disable();
    this.operation = 'REVIEW';
    this.open(this.modal);
  }

  onClickAdd() {
    this.formGroup.reset();
    this.formGroup.enable();
    this.operation = 'CREATE';
    this.open(this.modal);
  }

  onClickUpdate(event: Event, productionOrder: ProductionOrder) {
    event.stopPropagation();
    const { totalCount, ...productionOrderData } = productionOrder;
    this.formGroup.setValue({ ...productionOrderData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, productionOrder: ProductionOrder) {
    event.stopPropagation();
    const { totalCount, ...productionOrderData } = productionOrder;
    this.formGroup.setValue({ ...productionOrderData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const productionOrder = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createProductionOrder(productionOrder);
      } else if (this.operation === 'UPDATE') {
        this.updateProductionOrder(productionOrder);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
