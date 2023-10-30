import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  plants: Plant[] | null = null;
  plantsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'PlantName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 5;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    plantId: [''],
    plantName: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private plantService: PlantService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPlants();
  }

  getPlants() {
    this.isLoading = true;
    this.plantService.getPlants(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.plants = data;
        this.plantsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createPlant(Plant: Plant) {
    this.plantService.createPlant(Plant).subscribe({
      next: () => {
        this.getPlants();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi pogon';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updatePlant(Plant: Plant) {
    this.plantService.updatePlant(Plant).subscribe({
      next: () => {
        this.getPlants();
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

  deletePlant(id: string) {
    this.plantService.deletePlant(id).subscribe({
      next: () => {
        this.getPlants();
        this.modalReference?.close();
        this.toastMessage = 'Pogon je uspešno obrisan';
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
    this.getPlants();
  }

  onClickRow(plant: Plant) {
    const { totalCount, ...plantData } = plant;
    this.formGroup.setValue({ ...plantData });
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

  onClickUpdate(event: Event, plant: Plant) {
    event.stopPropagation();
    const { totalCount, ...plantData } = plant;
    this.formGroup.setValue({ ...plantData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, plant: Plant) {
    event.stopPropagation();
    const { totalCount, ...plantData } = plant;
    this.formGroup.setValue({ ...plantData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const Plant = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createPlant(Plant);
      } else if (this.operation === 'UPDATE') {
        this.updatePlant(Plant);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
