import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomRoutingModule } from './modules/routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/authentication/auth.service';
import { ClientService } from './services/client/client.service';
import { HttpService } from './services/http/http.service';

import { FragmentDashboardComponent } from './components/fragment-dashboard/fragment-dashboard.component';
import { FragmentClientComponent } from './components/fragment-dashboard/fragment-client/fragment-client.component';
import { FragmentCreateClientComponent } from './components/fragment-create-client/fragment-create-client.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FragmentDashboardComponent,
    FragmentClientComponent,
    FragmentCreateClientComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomRoutingModule
  ],
  providers: [AuthService, ClientService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
