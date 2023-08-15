import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TechnologicalSystem } from 'src/app/models/technologicalSystem';
import { TechnologicalSystemService } from 'src/app/services/technological-system.service';

@Component({
  selector: 'app-technological-system',
  templateUrl: './technological-system.component.html',
  styleUrls: ['./technological-system.component.css']
})
export class TechnologicalSystemComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  technologicalSystems: TechnologicalSystem[] | null = null;
  technologicalSystemsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'TechnologicalSystemName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    technologicalSystemId: [''],
    technologicalSystemName: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private technologicalSystemService: TechnologicalSystemService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTechnologicalSystems();
  }

  getTechnologicalSystems() {
    this.isLoading = true;
    this.technologicalSystemService.getTechnologicalSystems(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.technologicalSystems = data;
        this.technologicalSystemsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createTechnologicalSystem(technologicalSystem: TechnologicalSystem) {
    this.technologicalSystemService.createTechnologicalSystem(technologicalSystem).subscribe({
      next: () => {
        this.getTechnologicalSystems();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi tehnološki sistem';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateTechnologicalSystem(technologicalSystem: TechnologicalSystem) {
    this.technologicalSystemService.updateTechnologicalSystem(technologicalSystem).subscribe({
      next: () => {
        this.getTechnologicalSystems();
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

  deleteTechnologicalSystem(id: string) {
    this.technologicalSystemService.deleteTechnologicalSystem(id).subscribe({
      next: () => {
        this.getTechnologicalSystems();
        this.modalReference?.close();
        this.toastMessage = 'Tehnološki sistem je uspešno obrisan';
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
    this.getTechnologicalSystems();
  }

  onClickRow(technologicalSystem: TechnologicalSystem) {
    const { totalCount, ...technologicalSystemData } = technologicalSystem;
    this.formGroup.setValue({ ...technologicalSystemData });
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

  onClickUpdate(event: Event, technologicalSystem: TechnologicalSystem) {
    event.stopPropagation();
    const { totalCount, ...technologicalSystemData } = technologicalSystem;
    this.formGroup.setValue({ ...technologicalSystemData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, technologicalSystem: TechnologicalSystem) {
    event.stopPropagation();
    const { totalCount, ...technologicalSystemData } = technologicalSystem;
    this.formGroup.setValue({ ...technologicalSystemData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const TechnologicalSystem = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createTechnologicalSystem(TechnologicalSystem);
      } else if (this.operation === 'UPDATE') {
        this.updateTechnologicalSystem(TechnologicalSystem);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
