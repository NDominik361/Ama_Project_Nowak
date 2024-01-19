import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsTableComponent } from './content/pages/events/events-table/events-table.component';
import { ContactsTableComponent } from './content/pages/contacts/contacts-table/contacts-table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule
import { OrganizationTableComponent } from './content/pages/organizations/organization-table/organization-table.component';
import  ContactComponent  from './content/pages/contacts/contact/contact.component';
import { DashboardComponent } from './content/pages/dashboard/dashboard.component';
import { CalendarComponent } from './content/pages/calendar/calendar.component';
import { LoginComponent } from './content/pages/login/login.component';
import { AuthInterceptor } from './http-interceptor';
import {MessageService, SharedModule} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from "primeng/api";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginComponent,
    AppRoutingModule,
    EventsTableComponent,
    ContactsTableComponent,
    ContactComponent,
    HttpClientModule,
    OrganizationTableComponent,
    SharedModule,
    BrowserAnimationsModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
