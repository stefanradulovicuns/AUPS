import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductionPlan } from 'src/app/models/productionPlan';
import { ProductionPlanService } from 'src/app/services/production-plan.service';

@Component({
  selector: 'app-production-plan',
  templateUrl: './production-plan.component.html',
  styleUrls: ['./production-plan.component.css']
})
export class ProductionPlanComponent {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  productionPlans: ProductionPlan[] | null = null;
  productionPlansTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'ProductionPlanName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    productionPlanId: [''],
    productionPlanName: ['', Validators.required],
    description: ['', Validators.required],
    objectOfLaborId: ['', Validators.required]
  });
  isSubmitted: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private productionPlanService: ProductionPlanService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProductionPlans();
  }

  getProductionPlans() {
    this.isLoading = true;
    this.productionPlanService.getProductionPlans(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.productionPlans = data;
        this.productionPlansTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createProductionPlan(productionPlan: ProductionPlan) {
    this.productionPlanService.createProductionPlan(productionPlan).subscribe({
      next: () => {
        this.getProductionPlans();
        this.modalReference?.close();
        this.toastMessage = 'Uspešno dodat novi plan proizvodnje';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateProductionPlan(productionPlan: ProductionPlan) {
    this.productionPlanService.updateProductionPlan(productionPlan).subscribe({
      next: () => {
        this.getProductionPlans();
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

  deleteProductionPlan(id: string) {
    this.productionPlanService.deleteProductionPlan(id).subscribe({
      next: () => {
        this.getProductionPlans();
        this.modalReference?.close();
        this.toastMessage = 'Plan proizvodnje je uspešno obrisan';
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
    this.getProductionPlans();
  }

  onClickRow(productionPlan: ProductionPlan) {
    const { totalCount, ...productionPlanData } = productionPlan;
    this.formGroup.setValue({ ...productionPlanData });
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

  onClickUpdate(event: Event, productionPlan: ProductionPlan) {
    event.stopPropagation();
    const { totalCount, ...productionPlanData } = productionPlan;
    this.formGroup.setValue({ ...productionPlanData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, productionPlan: ProductionPlan) {
    event.stopPropagation();
    const { totalCount, ...productionPlanData } = productionPlan;
    this.formGroup.setValue({ ...productionPlanData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const productionPlan = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createProductionPlan(productionPlan);
      } else if (this.operation === 'UPDATE') {
        this.updateProductionPlan(productionPlan);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
