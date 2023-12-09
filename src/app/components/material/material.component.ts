import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  materials: Material[] | null = null;
  materialsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'MaterialName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 5;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    materialId: [''],
    materialName: ['', Validators.required],
    stockQuantity: [0, Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private materialService: MaterialService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this.isLoading = true;
    this.materialService.getMaterials(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.materials = data;
        this.materialsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createMaterial(Material: Material) {
    this.materialService.createMaterial(Material).subscribe({
      next: () => {
        this.getMaterials();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi materijal';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateMaterial(Material: Material) {
    this.materialService.updateMaterial(Material).subscribe({
      next: () => {
        this.getMaterials();
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

  deleteMaterial(id: string) {
    this.materialService.deleteMaterial(id).subscribe({
      next: () => {
        this.getMaterials();
        this.modalReference?.close();
        this.toastMessage = 'Materijal je uspešno obrisan';
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
    this.getMaterials();
  }

  onClickRow(material: Material) {
    const { totalCount, ...materialData } = material;
    this.formGroup.setValue({ ...materialData });
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

  onClickUpdate(event: Event, material: Material) {
    event.stopPropagation();
    const { totalCount, ...materialData } = material;
    this.formGroup.setValue({ ...materialData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, material: Material) {
    event.stopPropagation();
    const { totalCount, ...materialData } = material;
    this.formGroup.setValue({ ...materialData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const Material = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createMaterial(Material);
      } else if (this.operation === 'UPDATE') {
        this.updateMaterial(Material);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
