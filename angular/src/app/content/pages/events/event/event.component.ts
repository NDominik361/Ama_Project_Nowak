import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/events/event.service';
import { Router } from '@angular/router';
import { EventModule }  from 'src/app/model/Event';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import { DataService } from 'src/app/service/data.service';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Contact } from 'src/app/model/Contact';
import { EventsContactsComponent } from '../events-contacts/events-contacts.component';
import { ContactsTableComponent } from '../../contacts/contacts-table/contacts-table.component';
import { DialogModule } from 'primeng/dialog';
import { ContactService } from 'src/app/service/contact/contact.service';
import { setTime } from '@syncfusion/ej2-angular-schedule';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,CalendarModule, DialogModule,DropdownModule,EventsContactsComponent],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventComponent {
    EventForm: UntypedFormGroup;
    endDate: any;
    endTime:any;
    eventId: number = 0;
    visible: boolean = false;
    isUpdate: boolean = false;
    event: EventModule | undefined;
    events: EventModule[] = [];
    imageSrc: string | undefined;
    selectedCity: any;
    addContacts: boolean = false;
    contacts: number[] = [];
    invitedContacts: Contact [] = [];
    contactsToDelete: number[] = [];
    allContacts: Contact[] = [];
    defaultDate: Date = new Date();
    
    states: string[] = [
      'in planning',
      'in progress',
      'cancelled',
      'finished'
    ];
    types: string[] = [
      'for everyone',
      'private',
      'vip'
    ]
    cities: string[] = [
      'Zurich',
      'Geneva',
      'Basel',
      'Lausanne',
      'Bern',
      'Lucerne',
      'St. Gallen',
      'Lugano',
      'Biel/Bienne',
      'Thun',
      // Germany
      'Berlin',
      'Hamburg',
      'Munich',
      'Cologne',
      'Frankfurt',
      'Stuttgart',
      'Düsseldorf',
      'Dortmund',
      'Essen',
      'Leipzig',
      'Bremen',
      'Dresden',
      'Hanover',
      'Nuremberg',
      // Austria
      'Vienna',
      'Graz',
      'Linz',
      'Salzburg',
      'Innsbruck',
      'Klagenfurt',
      'Villach',
      'Wels',
      'St. Pölten',
      'Dornbirn'
      ];

    constructor(private contactService: ContactService,private fb: FormBuilder, private eventService: EventService, private router: Router, private messageService: QuickMessageService,
      private dataService: DataService) {
      this.checkAndStoreIdFromUrl();


      this.EventForm = this.fb.group({
        title: ['', Validators.required],
        start: [this.formattedDate(this.defaultDate)],
        end: [this.formattedDate(this.defaultDate)],
        location: [''],
        state: [''],
        type: [''],
        description: [''],
        changes: [null],
        foto: ['' ],
        address: ['']
      });
    }

    formattedDate(value:any): string {
      const originalValue = value;
      const dateValue = new Date(originalValue);
      const offset = dateValue.getTimezoneOffset() * 60000;
      const localDate = new Date(dateValue.getTime() - offset);
      return localDate.toISOString().slice(0, -1);
    }

    ngOnInit(): void {
      this.events = this.dataService.getEvents();
      if(this.events.length == 0  ){
        this.eventService.getAllEvents().then((events: EventModule[]) => {
          this.events = events;
        })
      }
      this.getContactsByEvent();
      this.getAllContacts();

    }

    getAllContacts(){
      this.contactService.getAllContacts().subscribe((contacts: Contact[]) => {
        this.allContacts = contacts;
      })
    }

    private checkAndStoreIdFromUrl(): void {
      if (this.router.url.match(/^\/events\/detail\/(\d+)$/)) {
        this.isUpdate = true;
        this.eventId = parseInt(RegExp.$1, 10);
        this.setEvent();
      }
    }

    setEvent(){
      this.eventService.getEventById(this.eventId).then(event => {
        this.event = event;
        this.setForm();
      })
    }

    createEvent() {
      const event: EventModule = this.EventForm?.value;
      this.eventService.createEvent(event).then(r => {
        this.messageService.createSuccessMessage("Veranstaltung erfolgreich erstellt");
        this.router.navigate(['/events'])
      })
    }

    updateEvent() {
      const event: EventModule = this.EventForm?.value;
      if (this.eventId) {
        this.eventService.updateEvent(this.eventId, event).then(r => {
          this.messageService.createSuccessMessage("Veranstaltung erfolgreich geändert");
          this.router.navigate(['/events'])
        });
      }
    }

    setForm(){
      this.EventForm = this.fb.group({
        title: [this.event?.title, Validators.required],
       // description: [event.description],
       // isPublic: [event.isPublic],
        start: [this.formattedDate(this.event?.start)],
        end: [this.formattedDate(this.event?.end)],
        location: [this.event?.location],
        //organizer: [event.organizer],
        state: [this.event?.state ?  this.event.state : ''],
        type: [this.event?.type],
        description: [this.event?.description],
        changes: [this.event?.changes],
        foto: [this.event?.foto],
        address: [this.event?.address]
      });
      console.log(this.EventForm.value);
      this.endTime = this.EventForm.value.end;
    }

    backward(){
      const currentIndex = this.events.findIndex(e => e.id === this.event?.id);
      if (currentIndex >= 0 && currentIndex < this.events.length - 1) {
        this.event = this.events[currentIndex + 1];
        this.eventId = this.event.id;
        this.setForm();
    }
  }

  forward(){
      const currentIndex = this.events.findIndex(c => c.id === this.event?.id);
      if (currentIndex > 0 && currentIndex <= this.events.length - 1) {
        this.event = this.events[currentIndex -1];
        this.eventId = this.event.id;
        this.setForm();
    }
    }

    addContactsToEvent(){
      this.eventService.addContactsToEvent(this.eventId, this.contacts).then(r => {
        this.messageService.createSuccessMessage("Invitations successfully added");
      });
    }

    getContactsByEvent(){
      this.eventService.getContactsByEvent(this.eventId).then((contacts: Contact[]) => {
        this.invitedContacts = contacts;

      });
    }

    deleteContactsByEvent(){
      this.eventService.deleteContactsByEvent(this.eventId, this.contactsToDelete).then(r => {
        this.messageService.createSuccessMessage("Invitations successfully deleted");
      });
    }

    showDialog(){
      this.visible = !this.visible;
    }
    onContactsChange(event: any){
      
      this.contacts=event[0].map((entry: Contact) => entry.id);
      this.contactsToDelete=event[1].map((entry: Contact) => entry.id);
      console.log(this.contacts);
      console.log(this.contactsToDelete);
      
      if(event[0] != this.allContacts){
        this.deleteContactsByEvent();
      }
      this.addContactsToEvent();


    }
  }
