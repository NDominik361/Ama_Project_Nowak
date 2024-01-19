import {Component, EventEmitter, Input, OnChanges, CUSTOM_ELEMENTS_SCHEMA,OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/service/events/event.service';
import { EventModule } from '../../../../model/Event';
import { DatePipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DataService } from 'src/app/service/data.service';
export interface Person {
  id: number;
  name: string;
  age: number;
}


@Component({
  selector: 'events-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule],
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsTableComponent implements OnInit {
  events: any[] = [];
  @ViewChild('dt') table!: TableModule;


  constructor(private eventService: EventService, private dataService: DataService, private router: Router, private messageService: QuickMessageService, private confirmationService: ConfirmationService) {
  }

  private fillWithData(): void {
    this.eventService.getAllEvents().then((events: EventModule[]) => {
      this.events = events;
      this.dataService.setEvents(this.events);
    })
  }

  ngOnInit(): void {
    this.fillWithData();
  }
  deleteEvent(event: EventModule) {
    this.confirmationService.confirm({
      key: 'eventConfirmationDialog',
      message: '<b>Möchten Sie diese Veranstaltung wirklich entfernen?</b>',
      header: 'Warnung',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Ja',
      rejectLabel: 'Abbrechen',
      rejectIcon: ' pi pi-times',
      rejectButtonStyleClass: 'cancel-button',
      accept: () => {
    this.eventService.deleteEvent(event.id).then(r => {
      this.events.splice(this.events.findIndex(e => e.id === event.id), 1);
      this.events = [...this.events];
      this.messageService.createSuccessMessage("Verantaltung erfolgreich gelöscht");
    })
    },
    reject: () => {
      this.messageService.createErrorMessage("Verantaltung konnte nicht gelöscht werden");
    }
  });
}

  openRowDetail(event: Event, e: EventModule) {
    const route = ['/', 'events', 'detail', e.id];
    const element = <HTMLElement>event.target;
    if (element && element.tagName == 'TD') {
      event.stopPropagation();
      this.router.navigate(route);
      return;
    }

  }
  createEvent() {
    this.router.navigate(['/', 'addEvent']);
    return;
  }
}
