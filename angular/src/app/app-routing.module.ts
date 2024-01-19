import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ContactComponent from './content/pages/contacts/contact/contact.component';
import { AppComponent } from './app.component';
import { ContactsTableComponent } from './content/pages/contacts/contacts-table/contacts-table.component';
import { EventsTableComponent } from './content/pages/events/events-table/events-table.component';
import { OrganizationTableComponent } from './content/pages/organizations/organization-table/organization-table.component';
/*import { AddEventComponent } from './content/pages/events/add-event/add-event.component';
import { EventsTableComponent } from './content/pages/events/events-table/events-table.component';
import { AddOrganzationComponent } from './content/pages/organizations/add-organzation/add-organzation.component';
import { OrganizationTableComponent } from './content/pages/organizations/organization-table/organization-table.component';*/
import { EventComponent } from './content/pages/events/event/event.component';
import { OrganzationComponent } from './content/pages/organizations/organzation/organzation.component';
import { DashboardComponent } from './content/pages/dashboard/dashboard.component';
import { CalendarComponent } from './content/pages/calendar/calendar.component';
import { LoginComponent } from './content/pages/login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },

  { path: 'addContact', component: ContactComponent },
  { path: 'addEvent', component: EventComponent },
  { path: 'addOrganization', component: OrganzationComponent },

  { path: 'contacts', component: ContactsTableComponent },  
  { path: 'events', component: EventsTableComponent },  
  { path: 'organizations', component: OrganizationTableComponent }, 

  { path: 'contacts/detail/:id', component: ContactComponent },  
  { path: 'events/detail/:id', component: EventComponent },  
  { path: 'organizations/detail/:id', component: OrganzationComponent }, 

  { path: 'calendar', component: CalendarComponent}
   
  /*{ path: 'addEvent', component: AddEventComponent },  
  { path: 'events', component: EventsTableComponent },  
  { path: 'addorganization', component: AddOrganzationComponent },  
  { path: 'orgaanizations', component: OrganizationTableComponent },  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
