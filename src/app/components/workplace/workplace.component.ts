import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Workplace } from 'src/app/models/workplace';
import { WorkplaceService } from 'src/app/services/workplace.service';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  workplaces: Workplace[] | null = null;
  workplacesTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'WorkplaceName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 5;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    workplaceId: [''],
    workplaceName: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private workplaceService: WorkplaceService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getWorkplaces();
  }

  getWorkplaces() {
    this.workplaceService.getWorkplaces(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.workplaces = data;
        this.workplacesTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createWorkplace(workplace: Workplace) {
    this.workplaceService.createWorkplace(workplace).subscribe({
      next: () => {
        this.getWorkplaces();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodato novo radno mesto';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateWorkplace(workplace: Workplace) {
    this.workplaceService.updateWorkplace(workplace).subscribe({
      next: () => {
        this.getWorkplaces();
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

  deleteWorkplace(id: string) {
    this.workplaceService.deleteWorkplace(id).subscribe({
      next: () => {
        this.getWorkplaces();
        this.modalReference?.close();
        this.toastMessage = 'Radno mesto je uspešno obrisano';
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
    this.getWorkplaces();
  }

  onClickRow(workplace: Workplace) {
    const { totalCount, ...workplaceData } = workplace;
    this.formGroup.setValue({ ...workplaceData });
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

  onClickUpdate(event: Event, workplace: Workplace) {
    event.stopPropagation();
    const { totalCount, ...workplaceData } = workplace;
    this.formGroup.setValue({ ...workplaceData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, workplace: Workplace) {
    event.stopPropagation();
    const { totalCount, ...workplaceData } = workplace;
    this.formGroup.setValue({ ...workplaceData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const workplace = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createWorkplace(workplace);
      } else if (this.operation === 'UPDATE') {
        this.updateWorkplace(workplace);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }

}
