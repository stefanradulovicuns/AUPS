import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionOrder } from 'src/app/models/productionOrder';
import { ProductionOrderService } from 'src/app/services/production-order.service';

@Component({
  selector: 'app-production-order-info',
  templateUrl: './production-order-info.component.html',
  styleUrls: ['./production-order-info.component.css']
})
export class ProductionOrderInfoComponent implements OnInit {

  productionOrder: ProductionOrder | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private productionOrderService: ProductionOrderService) { }

  ngOnInit(): void {
    this.getProductionOrder();
  }

  getProductionOrder() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productionOrderService.getProductionOrderById(id).subscribe({
      next: (data) => {
        this.productionOrder = data;
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

  onFinishTechnologicalProcedureClicked(event: boolean) {
    if (event && this.productionOrder) {
      this.productionOrderService.finishCurrentTechnologicalProcedure(this.productionOrder).subscribe({
        next: (data) => {
          this.productionOrder = data;
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
  }

}
