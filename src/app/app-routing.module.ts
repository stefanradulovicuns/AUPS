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
  { path: '', redirectTo: 'radnici', pathMatch: 'full' },
  {
    path: '', component: NavigationComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'registracija', component: RegistrationComponent },
      {
        path: 'radnici',
        component: EmployeeComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      },
      // {
      //   path: 'radna-mesta',
      //   component: WorkplaceComponent,
      //   canActivate: [roleGuard],
      //   data: {
      //     expectedRoles: ['Admin']
      //   }
      // },
      {
        path: 'organizacione-jedinice',
        component: OrganizationalUnitComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      },
      {
        path: 'nalozi-za-proizvodnju',
        component: ProductionOrderComponent,
        canActivate: [authGuard]
      },
      {
        path: 'nalozi-za-proizvodnju/:id',
        component: ProductionOrderInfoComponent,
        canActivate: [authGuard]
      },
      {
        path: 'predmeti-rada',
        component: ObjectOfLaborComponent,
        canActivate: [authGuard]
      },
      {
        path: 'predmeti-rada/:id',
        component: ObjectOfLaborInfoComponent,
        canActivate: [authGuard]
      },
      {
        path: 'skladista',
        component: WarehouseComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      },
      {
        path: 'planovi-proizvodnje',
        component: ProductionPlanComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin', 'Menadzer']
        }
      },
      {
        path: 'pogoni',
        component: PlantComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      },
      {
        path: 'tehnoloski-sistemi',
        component: TechnologicalSystemComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      },
      {
        path: 'tehnoloski-postupci',
        component: TechnologicalProcedureComponent,
        canActivate: [roleGuard],
        data: {
          expectedRoles: ['Admin']
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
