import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, UntypedFormControl, UntypedFormGroup,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/service/contact/contact.service';
import { Router } from '@angular/router';
import { Contact } from 'src/app/model/Contact';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import { DataService } from 'src/app/service/data.service';
import { EventModule } from 'src/app/model/Event';
import { OrganizationService } from 'src/app/service/organzaton/organization.service';
import { Organization } from 'src/app/model/Organization';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'add-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ContactComponent {
  ContactForm: UntypedFormGroup;
  contactId: number = 0;
  isUpdate: boolean = false;
  contacts: Contact[] = []
  contact:Contact | undefined;
  events: EventModule [] = [];
  organizations: Organization[] = [];

    constructor(private orgService: OrganizationService, private fb: FormBuilder, private messageService: QuickMessageService,private contactService: ContactService,private confirmationService: ConfirmationService,
      private router: Router, private dataService: DataService) {
      this.checkAndStoreIdFromUrl();
      this.ContactForm = this.fb.group({
        vorname: ['', Validators.required],
        nachname: ['', Validators.required],
        vip: [false],
        anrede: [''],
        akadTitel: [''],
        organization: ['1'],
        telefonNr: [''],
        adresse: [''],
      });
    }

    ngOnInit(): void {
      this.contacts = this.dataService.getContacts();
      if(this.contacts.length == 0  ){
        this.contactService.getAllContacts().subscribe((contacts: Contact[]) => {
          this.contacts = contacts;
        })
      }

      this.orgService.getAllOrganizations().then((organizations: Organization[]) => {
        this.organizations = organizations;
        console.log(this.organizations);
      })
    }

    checkAndStoreIdFromUrl(): void {
      if (this.router.url.match(/^\/contacts\/detail\/(\d+)$/)) {
        this.contactId = parseInt(RegExp.$1, 10);
        this.isUpdate = true;
        this.setContact();
      }
    }

    setContact(){
      this.contactService.getContactById(this.contactId).then(contact => {
        this.contact = contact;
        this.setForm();
      });
    }

    setForm(){
        this.ContactForm = this.fb.group({
          vorname: [this.contact?.vorname, Validators.required],
          nachname: [this.contact?.nachname, Validators.required],
          vip: [this.contact?.vip],
          anrede: [this.contact?.anrede],
          akadTitel: [this.contact?.akadTitel],
          organization: [this.contact?.organization],
          telefonNr: [this.contact?.telefonNr],
          adresse: [this.contact?.adresse],
        });
      }



    createContact() {
      const contact: Contact = this.ContactForm?.value;
      this.contactService.createContact(contact).then(r => {
        this.messageService.createSuccessMessage("Kontakt erfolgreich erstellt");
        this.router.navigate(['/contacts'])
      })
    }

    updateContact() {
      const contact: Contact = this.ContactForm?.value;
      this.contactService.updateContact(this.contactId,contact).then(r => {
        this.messageService.createSuccessMessage("Kontakt erfolgreich geändert");
        this.router.navigate(['/contacts'])
      })
    }

    forward(){
      const currentIndex = this.contacts.findIndex(c => c.id === this.contact?.id);
      if (currentIndex >= 0 && currentIndex < this.contacts.length - 1) {
        this.contact = this.contacts[currentIndex + 1];
        this.contactId = this.contact.id;
        this.setForm();
    }
  }

    backward(){
      const currentIndex = this.contacts.findIndex(c => c.id === this.contact?.id);
      if (currentIndex > 0 && currentIndex <= this.contacts.length - 1) {
        this.contact = this.contacts[currentIndex -1];
        this.contactId = this.contact.id;
        this.setForm();

    }
    }
}
