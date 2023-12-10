import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Material } from 'src/app/models/material';
import { ObjectOfLaborMaterial } from 'src/app/models/objectOfLaborMaterial';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';
import { ObjectOfLaborMaterialService } from 'src/app/services/object-of-labor-material.service';

@Component({
  selector: 'app-object-of-labor-material',
  templateUrl: './object-of-labor-material.component.html',
  styleUrls: ['./object-of-labor-material.component.css']
})
export class ObjectOfLaborMaterialComponent {
  @Input() objectOfLaborId: string = '';
  @Input() showAdminButtons: boolean = false;

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  objectOfLaborMaterials: ObjectOfLaborMaterial[] | null = null;
  objectOfLaborMaterialsTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'MaterialName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 5;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    objectOfLaborMaterialId: [''],
    materialId: ['', Validators.required],
    objectOfLaborId: [''],
    quantity: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;
  materials: Material[] | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private objectOfLaborMaterialService: ObjectOfLaborMaterialService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private materialService: MaterialService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getObjectOfLaborMaterials();
    this.getMaterials();
  }

  getObjectOfLaborMaterials() {
    this.isLoading = true;
    this.objectOfLaborMaterialService.getObjectOfLaborMaterials(this.search, this.sortBy, this.sortOrder, this.page, this.count, this.objectOfLaborId).subscribe({
      next: (data) => {
        this.objectOfLaborMaterials = data;
        this.objectOfLaborMaterialsTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  getMaterials() {
    this.materialService.getMaterials('', '', '', 0, 0).subscribe({
      next: (data) => {
        this.materials = data;
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

  createObjectOfLaborMaterial(objectOfLaborMaterial: ObjectOfLaborMaterial) {
    this.objectOfLaborMaterialService.createObjectOfLaborMaterial(objectOfLaborMaterial).subscribe({
      next: () => {
        this.getObjectOfLaborMaterials();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi materijal za predmet rada';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateObjectOfLaborMaterial(objectOfLaborMaterial: ObjectOfLaborMaterial) {
    this.objectOfLaborMaterialService.updateObjectOfLaborMaterial(objectOfLaborMaterial).subscribe({
      next: () => {
        this.getObjectOfLaborMaterials();
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

  deleteObjectOfLaborMaterial(id: string) {
    this.objectOfLaborMaterialService.deleteObjectOfLaborMaterial(id).subscribe({
      next: () => {
        this.getObjectOfLaborMaterials();
        this.modalReference?.close();
        this.toastMessage = 'Materijal za predmet rada je uspešno obrisan';
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
    this.getObjectOfLaborMaterials();
  }

  onClickRow(objectOfLaborMaterial: ObjectOfLaborMaterial) {
    const { totalCount, materialName, stockQuantity, ...objectOfLaborMaterialData } = objectOfLaborMaterial;
    this.formGroup.setValue({ ...objectOfLaborMaterialData });
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

  onClickUpdate(event: Event, objectOfLaborMaterial: ObjectOfLaborMaterial) {
    event.stopPropagation();
    const { totalCount, materialName, stockQuantity, ...objectOfLaborMaterialData } = objectOfLaborMaterial;
    this.formGroup.setValue({ ...objectOfLaborMaterialData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, objectOfLaborMaterial: ObjectOfLaborMaterial) {
    event.stopPropagation();
    const { totalCount, materialName, stockQuantity, ...objectOfLaborMaterialData } = objectOfLaborMaterial;
    this.formGroup.setValue({ ...objectOfLaborMaterialData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const objectOfLaborMaterial = Object.assign(this.formGroup.value);
      objectOfLaborMaterial.objectOfLaborId = this.objectOfLaborId;
      if (this.operation === 'CREATE') {
        this.createObjectOfLaborMaterial(objectOfLaborMaterial);
      } else if (this.operation === 'UPDATE') {
        this.updateObjectOfLaborMaterial(objectOfLaborMaterial);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
