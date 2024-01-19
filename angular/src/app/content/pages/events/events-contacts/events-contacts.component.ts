import { Component,Input, Output } from '@angular/core';
import { Contact } from 'src/app/model/Contact';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableModule } from 'primeng/table';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'events-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TableModule],
  templateUrl: './events-contacts.component.html',
  styleUrls: ['./events-contacts.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventsContactsComponent {
  @Input() allContacts: Contact[] = [];
  @Input() invitedContacts: Contact[] = [];
  @Output() onContactsChange = new EventEmitter<any>();

  ngOnInit(): void {
    setTimeout(() => {
      this.allContacts = this.allContacts.filter((element) => !this.invitedContacts.some((e) => e.id == element.id));

    },300);
  }
  onRowClickLeft(event: any, contact: Contact) {
    this.allContacts = this.allContacts.filter((element) => element !== contact);
    this.invitedContacts.push(contact);
  }
  onRowClickRight(event: any, contact: Contact) {
    this.invitedContacts = this.invitedContacts.filter((element) => element !== contact);
    this.allContacts.push(contact);
  }

  saveChanges() {
    this.onContactsChange.emit([this.invitedContacts, this.allContacts]);
  }
}
