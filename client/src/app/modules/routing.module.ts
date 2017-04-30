import { RouterModule, Routes } from '@angular/router';
import { FragmentDashboardComponent } from '../components/fragment-dashboard/fragment-dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { FragmentCreateClientComponent } from '../components/fragment-create-client/fragment-create-client.component';
import { FragmentCreateUserComponent } from '../components/fragment-create-user/fragment-create-user.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: FragmentDashboardComponent },
      { path: 'create', component: FragmentCreateClientComponent },
      { path: 'createuser', component: FragmentCreateUserComponent}
    ]
  },
  { 
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class CustomRoutingModule {}