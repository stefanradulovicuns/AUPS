import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObjectOfLaborTechnologicalProcedure } from 'src/app/models/objectOfLaborTechnologicalProcedure';
import { TechnologicalProcedure } from 'src/app/models/technologicalProcedure';
import { ObjectOfLaborTechnologicalProcedureService } from 'src/app/services/object-of-labor-technological-procedure.service';
import { TechnologicalProcedureService } from 'src/app/services/technological-procedure.service';

@Component({
  selector: 'app-object-of-labor-technological-procedure',
  templateUrl: './object-of-labor-technological-procedure.component.html',
  styleUrls: ['./object-of-labor-technological-procedure.component.css']
})
export class ObjectOfLaborTechnologicalProcedureComponent implements OnInit {

  @Input() objectOfLaborId: string = '';

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  objectOfLaborTechnologicalProcedures: ObjectOfLaborTechnologicalProcedure[] | null = null;
  objectOfLaborTechnologicalProceduresTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'OrderOfExecution';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    objectOfLaborTechnologicalProcedureId: [''],
    technologicalProcedureId: ['', Validators.required],
    orderOfExecution: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;
  technologicalProcedures: TechnologicalProcedure[] | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private objectOfLaborTechnologicalProcedureService: ObjectOfLaborTechnologicalProcedureService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private technologicalProcedureService: TechnologicalProcedureService) { }

  ngOnInit(): void {
    this.getObjectOfLaborTechnologicalProcedures();
    this.getTechnologicalProcedures();
  }

  getObjectOfLaborTechnologicalProcedures() {
    this.isLoading = true;
    this.objectOfLaborTechnologicalProcedureService.getObjectOfLaborTechnologicalProcedures(this.search, this.sortBy, this.sortOrder, this.page, this.count, this.objectOfLaborId).subscribe({
      next: (data) => {
        this.objectOfLaborTechnologicalProcedures = data;
        this.objectOfLaborTechnologicalProceduresTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  getTechnologicalProcedures() {
    this.technologicalProcedureService.getTechnologicalProcedures('', '', '', 0, 0).subscribe({
      next: (data) => {
        this.technologicalProcedures = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => {

      }
    });
  }

  createObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure) {
    this.objectOfLaborTechnologicalProcedureService.createObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure).subscribe({
      next: () => {
        this.getObjectOfLaborTechnologicalProcedures();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi tehnološki postupak za predmet rada';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure) {
    this.objectOfLaborTechnologicalProcedureService.updateObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure).subscribe({
      next: () => {
        this.getObjectOfLaborTechnologicalProcedures();
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

  deleteObjectOfLaborTechnologicalProcedure(id: string) {
    this.objectOfLaborTechnologicalProcedureService.deleteObjectOfLaborTechnologicalProcedure(id).subscribe({
      next: () => {
        this.getObjectOfLaborTechnologicalProcedures();
        this.modalReference?.close();
        this.toastMessage = 'Tehnološki postupak za predmet rada je uspešno obrisan';
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
    this.getObjectOfLaborTechnologicalProcedures();
  }

  onClickRow(objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure) {
    const { totalCount, objectOfLaborId, objectOfLaborName, technologicalProcedureName, ...objectOfLaborTechnologicalProcedureData } = objectOfLaborTechnologicalProcedure;
    this.formGroup.setValue({ ...objectOfLaborTechnologicalProcedureData });
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

  onClickUpdate(event: Event, objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure) {
    event.stopPropagation();
    const { totalCount, objectOfLaborId, objectOfLaborName, technologicalProcedureName, ...objectOfLaborTechnologicalProcedureData } = objectOfLaborTechnologicalProcedure;
    this.formGroup.setValue({ ...objectOfLaborTechnologicalProcedureData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure) {
    event.stopPropagation();
    const { totalCount, objectOfLaborId, objectOfLaborName, technologicalProcedureName, ...objectOfLaborTechnologicalProcedureData } = objectOfLaborTechnologicalProcedure;
    this.formGroup.setValue({ ...objectOfLaborTechnologicalProcedureData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const objectOfLaborTechnologicalProcedure = Object.assign(this.formGroup.value);
      objectOfLaborTechnologicalProcedure.objectOfLaborId = this.objectOfLaborId;
      if (this.operation === 'CREATE') {
        this.createObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure);
      } else if (this.operation === 'UPDATE') {
        this.updateObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
