import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './auth/dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard';
import { HomePageComponent } from './auth/dashboard/dashboard/home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'homePage',
        pathMatch: 'full',
      },
      {
        path: 'homePage',
        title: 'HomePage',
        component: HomePageComponent,
      },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
