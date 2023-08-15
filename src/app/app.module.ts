import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalRef, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { OrganizationalUnitComponent } from './components/organizational-unit/organizational-unit.component';
import { ProductionOrderComponent } from './components/production-order/production-order.component';
import { ObjectOfLaborComponent } from './components/object-of-labor/object-of-labor.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ProductionPlanComponent } from './components/production-plan/production-plan.component';
import { PlantComponent } from './components/plant/plant.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    WorkplaceComponent,
    OrganizationalUnitComponent,
    ProductionOrderComponent,
    ObjectOfLaborComponent,
    WarehouseComponent,
    ProductionPlanComponent,
    PlantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
