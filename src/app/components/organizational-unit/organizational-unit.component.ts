import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationalUnit } from 'src/app/models/organizationalUnit';
import { OrganizationalUnitService } from 'src/app/services/organizational-unit.service';

@Component({
  selector: 'app-organizational-unit',
  templateUrl: './organizational-unit.component.html',
  styleUrls: ['./organizational-unit.component.css']
})
export class OrganizationalUnitComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  organizationalUnits: OrganizationalUnit[] | null = null;
  organizationalUnitsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'OrganizationalUnitName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 5;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    organizationalUnitId: [''],
    organizationalUnitName: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private organizationalUnitService: OrganizationalUnitService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getOrganizationalUnits();
  }

  getOrganizationalUnits() {
    this.isLoading = true;
    this.organizationalUnitService.getOrganizationalUnits(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.organizationalUnits = data;
        this.organizationalUnitsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createOrganizationalUnit(organizationalUnit: OrganizationalUnit) {
    this.organizationalUnitService.createOrganizationalUnit(organizationalUnit).subscribe({
      next: () => {
        this.getOrganizationalUnits();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodata nova organizaciona jedinica';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateOrganizationalUnit(organizationalUnit: OrganizationalUnit) {
    this.organizationalUnitService.updateOrganizationalUnit(organizationalUnit).subscribe({
      next: () => {
        this.getOrganizationalUnits();
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

  deleteOrganizationalUnit(id: string) {
    this.organizationalUnitService.deleteOrganizationalUnit(id).subscribe({
      next: () => {
        this.getOrganizationalUnits();
        this.modalReference?.close();
        this.toastMessage = 'Organizaciona jedinica je uspešno obrisana';
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
    this.getOrganizationalUnits();
  }

  onClickRow(organizationalUnit: OrganizationalUnit) {
    const { totalCount, ...organizationalUnitData } = organizationalUnit;
    this.formGroup.setValue({ ...organizationalUnitData });
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

  onClickUpdate(event: Event, organizationalUnit: OrganizationalUnit) {
    event.stopPropagation();
    const { totalCount, ...organizationalUnitData } = organizationalUnit;
    this.formGroup.setValue({ ...organizationalUnitData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, organizationalUnit: OrganizationalUnit) {
    event.stopPropagation();
    const { totalCount, ...organizationalUnitData } = organizationalUnit;
    this.formGroup.setValue({ ...organizationalUnitData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const organizationalUnit = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createOrganizationalUnit(organizationalUnit);
      } else if (this.operation === 'UPDATE') {
        this.updateOrganizationalUnit(organizationalUnit);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
