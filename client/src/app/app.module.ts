import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomRoutingModule } from './modules/routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/authentication/auth.service';
import { ClientService } from './services/client/client.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FragmentClientComponent } from './components/fragment-client/fragment-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FragmentClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomRoutingModule
  ],
  providers: [AuthService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
