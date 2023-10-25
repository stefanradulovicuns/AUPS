import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
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
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { ObjectOfLaborInfoComponent } from './components/object-of-labor-info/object-of-labor-info.component';
import { ProductionOrderInfoComponent } from './components/production-order-info/production-order-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: '', component: NavigationComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [roleGuard],
        data: {
          expectedRole: 'Admin'
        }
      },
      { path: 'workplace', component: WorkplaceComponent },
      { path: 'organizationalUnit', component: OrganizationalUnitComponent },
      { path: 'productionOrder', component: ProductionOrderComponent },
      { path: 'productionOrder/:id', component: ProductionOrderInfoComponent },
      { path: 'objectOfLabor', component: ObjectOfLaborComponent },
      { path: 'objectOfLabor/:id', component: ObjectOfLaborInfoComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'productionPlan', component: ProductionPlanComponent },
      { path: 'plant', component: PlantComponent },
      { path: 'technologicalSystem', component: TechnologicalSystemComponent },
      { path: 'technologicalProcedure', component: TechnologicalProcedureComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
