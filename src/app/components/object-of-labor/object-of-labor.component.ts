import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObjectOfLabor } from 'src/app/models/objectOfLabor';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectOfLaborService } from 'src/app/services/object-of-labor.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-object-of-labor',
  templateUrl: './object-of-labor.component.html',
  styleUrls: ['./object-of-labor.component.css']
})
export class ObjectOfLaborComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  objectOfLabors: ObjectOfLabor[] | null = null;
  objectOfLaborsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'ObjectOfLaborName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    objectOfLaborId: [''],
    objectOfLaborName: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    stockQuantity: [0, Validators.required],
    warehouseId: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  warehouses: Warehouse[] | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private objectOfLaborService: ObjectOfLaborService,
    private warehouseService: WarehouseService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getObjectOfLabors();
    this.getWarehouses();
  }

  getObjectOfLabors() {
    this.isLoading = true;
    this.objectOfLaborService.getObjectOfLabors(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.objectOfLabors = data;
        this.objectOfLaborsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createObjectOfLabor(objectOfLabor: ObjectOfLabor) {
    this.objectOfLaborService.createObjectOfLabor(objectOfLabor).subscribe({
      next: () => {
        this.getObjectOfLabors();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi predmet rada';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateObjectOfLabor(objectOfLabor: ObjectOfLabor) {
    this.objectOfLaborService.updateObjectOfLabor(objectOfLabor).subscribe({
      next: () => {
        this.getObjectOfLabors();
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

  deleteObjectOfLabor(id: string) {
    this.objectOfLaborService.deleteObjectOfLabor(id).subscribe({
      next: () => {
        this.getObjectOfLabors();
        this.modalReference?.close();
        this.toastMessage = 'Predmet rada je uspešno obrisan';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  getWarehouses() {
    this.warehouseService.getWarehouses('', 'City', 'ASC', 0, 0).subscribe({
      next: (data) => {
        this.warehouses = data;
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
    this.getObjectOfLabors();
  }

  onClickRow(objectOfLabor: ObjectOfLabor) {
    const { totalCount, warehouseFullAddress, ...objectOfLaborData } = objectOfLabor;
    this.formGroup.setValue({ ...objectOfLaborData });
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

  onClickUpdate(event: Event, objectOfLabor: ObjectOfLabor) {
    event.stopPropagation();
    const { totalCount, warehouseFullAddress, ...objectOfLaborData } = objectOfLabor;
    this.formGroup.setValue({ ...objectOfLaborData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, objectOfLabor: ObjectOfLabor) {
    event.stopPropagation();
    const { totalCount, warehouseFullAddress, ...objectOfLaborData } = objectOfLabor;
    this.formGroup.setValue({ ...objectOfLaborData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const objectOfLabor = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createObjectOfLabor(objectOfLabor);
      } else if (this.operation === 'UPDATE') {
        this.updateObjectOfLabor(objectOfLabor);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
