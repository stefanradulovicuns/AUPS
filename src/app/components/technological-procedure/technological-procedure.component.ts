import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationalUnit } from 'src/app/models/organizationalUnit';
import { Plant } from 'src/app/models/plant';
import { TechnologicalProcedure } from 'src/app/models/technologicalProcedure';
import { TechnologicalSystem } from 'src/app/models/technologicalSystem';
import { OrganizationalUnitService } from 'src/app/services/organizational-unit.service';
import { PlantService } from 'src/app/services/plant.service';
import { TechnologicalProcedureService } from 'src/app/services/technological-procedure.service';
import { TechnologicalSystemService } from 'src/app/services/technological-system.service';

@Component({
  selector: 'app-technological-procedure',
  templateUrl: './technological-procedure.component.html',
  styleUrls: ['./technological-procedure.component.css']
})
export class TechnologicalProcedureComponent {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  technologicalProcedures: TechnologicalProcedure[] | null = null;
  technologicalProceduresTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'TechnologicalProcedureName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    technologicalProcedureId: [''],
    technologicalProcedureName: ['', Validators.required],
    duration: [0, Validators.required],
    organizationalUnitId: ['', Validators.required],
    plantId: ['', Validators.required],
    technologicalSystemId: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  organizationalUnits: OrganizationalUnit[] | null = null;
  plants: Plant[] | null = null;
  technologicalSystems: TechnologicalSystem[] | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private technologicalProcedureService: TechnologicalProcedureService,
    private organizationalUnitService: OrganizationalUnitService,
    private plantService: PlantService,
    private technologicalSystemService: TechnologicalSystemService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTechnologicalProcedures();
    this.getOrganizationalUnits();
    this.getPlants();
    this.getTechnologicalSystems();
  }

  getTechnologicalProcedures() {
    this.isLoading = true;
    this.technologicalProcedureService.getTechnologicalProcedures(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.technologicalProcedures = data;
        this.technologicalProceduresTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createTechnologicalProcedure(technologicalProcedure: TechnologicalProcedure) {
    this.technologicalProcedureService.createTechnologicalProcedure(technologicalProcedure).subscribe({
      next: () => {
        this.getTechnologicalProcedures();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi tehnološki postupak';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateTechnologicalProcedure(technologicalProcedure: TechnologicalProcedure) {
    this.technologicalProcedureService.updateTechnologicalProcedure(technologicalProcedure).subscribe({
      next: () => {
        this.getTechnologicalProcedures();
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

  deleteTechnologicalProcedure(id: string) {
    this.technologicalProcedureService.deleteTechnologicalProcedure(id).subscribe({
      next: () => {
        this.getTechnologicalProcedures();
        this.modalReference?.close();
        this.toastMessage = 'Tehnološki postupak je uspešno obrisan';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  getOrganizationalUnits() {
    this.organizationalUnitService.getOrganizationalUnits('', 'OrganizationalUnitName', 'ASC', 0, 0).subscribe({
      next: (data) => {
        this.organizationalUnits = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  getPlants() {
    this.plantService.getPlants('', 'PlantName', 'ASC', 0, 0).subscribe({
      next: (data) => {
        this.plants = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  getTechnologicalSystems() {
    this.technologicalSystemService.getTechnologicalSystems('', 'TechnologicalSystemName', 'ASC', 0, 0).subscribe({
      next: (data) => {
        this.technologicalSystems = data;
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
    this.getTechnologicalProcedures();
  }

  onClickRow(technologicalProcedure: TechnologicalProcedure) {
    const { totalCount, organizationalUnitName, technologicalSystemName, plantName, ...technologicalProcedureData } = technologicalProcedure;
    this.formGroup.setValue({ ...technologicalProcedureData });
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

  onClickUpdate(event: Event, technologicalProcedure: TechnologicalProcedure) {
    event.stopPropagation();
    const { totalCount, organizationalUnitName, technologicalSystemName, plantName, ...technologicalProcedureData } = technologicalProcedure;
    this.formGroup.setValue({ ...technologicalProcedureData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, technologicalProcedure: TechnologicalProcedure) {
    event.stopPropagation();
    const { totalCount, organizationalUnitName, technologicalSystemName, plantName, ...technologicalProcedureData } = technologicalProcedure;
    this.formGroup.setValue({ ...technologicalProcedureData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const TechnologicalProcedure = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createTechnologicalProcedure(TechnologicalProcedure);
      } else if (this.operation === 'UPDATE') {
        this.updateTechnologicalProcedure(TechnologicalProcedure);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
