import { Routes } from '@angular/router';

import { LoginComponent }
  from './login/login.component';

import { DashboardComponent }
  from './dashboard/dashboard.component';

import { TestCasesComponent }
  from './test-cases/test-cases.component';

import { TeamDashboardComponent }
  from './team-dashboard/team-dashboard.component';

import { authGuard }
  from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'test-cases',
    component: TestCasesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'teams',
    component: TeamDashboardComponent,
    canActivate: [authGuard]
  }

];