import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact';
import { Organization } from '../model/Organization';
import { EventModule } from '../model/Event';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private contacts: Contact[] = [];
  private events: EventModule[] = [];
  private orgs: Organization[] = [];


  setContacts(contacts: any[]) {
    this.contacts = contacts;
    console.log(this.contacts);
  }

  getContacts() {
    return this.contacts;
    console.log(this.contacts);
  }

  setEvents(events: any[]) {
    this.events = events;
  }

  getEvents() {
    return this.events;
  }

  setOrgs(orgs: any[]) {
    this.orgs = orgs;
  }

  getOrgs() {
    return this.orgs;
  }




}