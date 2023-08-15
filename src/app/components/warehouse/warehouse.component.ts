import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  warehouses: Warehouse[] | null = null;
  warehousesTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'City';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    warehouseId: [''],
    address: ['', Validators.required],
    city: ['', Validators.required],
    capacity: [0, Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private warehouseService: WarehouseService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses() {
    this.isLoading = true;
    this.warehouseService.getWarehouses(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.warehouses = data;
        this.warehousesTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createWarehouse(warehouse: Warehouse) {
    this.warehouseService.createWarehouse(warehouse).subscribe({
      next: () => {
        this.getWarehouses();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodato novo skladište';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateWarehouse(warehouse: Warehouse) {
    this.warehouseService.updateWarehouse(warehouse).subscribe({
      next: () => {
        this.getWarehouses();
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

  deleteWarehouse(id: string) {
    this.warehouseService.deleteWarehouse(id).subscribe({
      next: () => {
        this.getWarehouses();
        this.modalReference?.close();
        this.toastMessage = 'Skladište je uspešno obrisano';
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
    this.getWarehouses();
  }

  onClickRow(warehouse: Warehouse) {
    const { totalCount, ...warehouseData } = warehouse;
    this.formGroup.setValue({ ...warehouseData });
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

  onClickUpdate(event: Event, warehouse: Warehouse) {
    event.stopPropagation();
    const { totalCount, ...warehouseData } = warehouse;
    this.formGroup.setValue({ ...warehouseData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, warehouse: Warehouse) {
    event.stopPropagation();
    const { totalCount, ...warehouseData } = warehouse;
    this.formGroup.setValue({ ...warehouseData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const warehouse = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createWarehouse(warehouse);
      } else if (this.operation === 'UPDATE') {
        this.updateWarehouse(warehouse);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
