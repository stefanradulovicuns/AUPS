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

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'workplace', component: WorkplaceComponent },
  { path: 'organizationalUnit', component: OrganizationalUnitComponent },
  { path: 'productionOrder', component: ProductionOrderComponent },
  { path: 'objectOfLabor', component: ObjectOfLaborComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'productionPlan', component: ProductionPlanComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'technologicalSystem', component: TechnologicalSystemComponent },
  { path: 'technologicalProcedure', component: TechnologicalProcedureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
