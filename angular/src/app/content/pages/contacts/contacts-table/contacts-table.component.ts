import { ContactService } from '../../../../service/contact/contact.service';
import { Contact } from '../../../../model/Contact';
import {Component, EventEmitter, Input, OnChanges, CUSTOM_ELEMENTS_SCHEMA,OnInit, Output, SimpleChanges, ViewChild} from '@angular/core'; 
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DataService } from 'src/app/service/data.service';
import { Organization } from 'src/app/model/Organization';
import { OrganizationService } from 'src/app/service/organzaton/organization.service';
@Component({
  selector: 'contacts-table',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, ConfirmDialogModule],
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsTableComponent {
    contacts: Contact[] = [];
    organzations: Organization[] = [];
    
    constructor(private organizationService: OrganizationService,private contactService: ContactService,private router: Router, 
      private messageService: QuickMessageService, private confirmationService: ConfirmationService, private dataService: DataService) {}
    ngOnInit() {
      this.contactService.getAllContacts().subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.dataService.setContacts([...this.contacts]);
      })
      
        this.organizationService.getAllOrganizations().then((organizations: Organization[]) => {
          this.organzations = organizations;
        })
        
    }

    openRowDetail(event: Event, contact: Contact) {
      const route = ['/', 'contacts', 'detail', contact.id];
      const element = <HTMLElement>event.target;
      if (element && element.tagName == 'TD') {
        event.stopPropagation();
        this.router.navigate(route);
        return;
      }
    }
    isOrganizationPresent(id:number):string{
      let organizationName = this.organzations.find((org: Organization) => org.id === id);
      return organizationName?.name || "";
    }

    deleteContact(contact: Contact){
      this.confirmationService.confirm({
        key: 'contactConfirmationDialog',
        message: '<b>Möchten Sie diesen Kontakt wirklich entfernen?</b>',
        header: 'Warnung',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ja',
        rejectLabel: 'Abbrechen',
        rejectIcon: ' pi pi-times',
        rejectButtonStyleClass: 'cancel-button',
        accept: () => {
      this.contactService.deleteContact(contact.id).then(r => {
        this.contacts.splice(this.contacts.findIndex(c => c.id === contact.id), 1);
        this.contacts = [...this.contacts];
        this.dataService.setContacts([...this.contacts]);
        this.messageService.createSuccessMessage("Kontakt erfolgreich gelöscht");
      })
    }, reject: () => {
      this.messageService.createErrorMessage("Kontakt konnte nicht gelöscht werden");
    }
    });
    }
    createContact() {
      this.router.navigate(['/', 'addContact']);
      return;
    }
}
