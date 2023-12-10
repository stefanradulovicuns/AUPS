import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModalRef, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkplaceComponent } from './components/workplace/workplace.component';
import { OrganizationalUnitComponent } from './components/organizational-unit/organizational-unit.component';
import { ProductionOrderComponent } from './components/production-order/production-order.component';
import { ObjectOfLaborComponent } from './components/object-of-labor/object-of-labor.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ProductionPlanComponent } from './components/production-plan/production-plan.component';
import { PlantComponent } from './components/plant/plant.component';
import { TechnologicalSystemComponent } from './components/technological-system/technological-system.component';
import { TechnologicalProcedureComponent } from './components/technological-procedure/technological-procedure.component';
import { ObjectOfLaborTechnologicalProcedureComponent } from './components/object-of-labor-technological-procedure/object-of-labor-technological-procedure.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ObjectOfLaborInfoComponent } from './components/object-of-labor-info/object-of-labor-info.component';
import { ProductionOrderInfoComponent } from './components/production-order-info/production-order-info.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MaterialComponent } from './components/material/material.component';
import { ObjectOfLaborMaterialComponent } from './components/object-of-labor-material/object-of-labor-material.component';

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
    TechnologicalSystemComponent,
    TechnologicalProcedureComponent,
    ObjectOfLaborTechnologicalProcedureComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationComponent,
    ObjectOfLaborInfoComponent,
    ProductionOrderInfoComponent,
    MaterialComponent,
    ObjectOfLaborMaterialComponent
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
