import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel} from '@syncfusion/ej2-angular-schedule'; 
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from 'src/app/service/events/event.service';
import { EventModule } from 'src/app/model/Event';
import { TimeTransformPipe } from 'src/app/pipes/time-transform.pipe';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers:[TimeTransformPipe],
  imports:[ScheduleModule, FullCalendarModule
  ]
})
export class CalendarComponent {
  constructor (private router: Router,private eventService: EventService,private timeTransformPipe: TimeTransformPipe){
  }

  events: EventModule[] = [];
 
  ngOnInit(): void {
    this.eventService.getAllEvents().then((events: EventModule[]) => {
      this.events = events;
      this.fillCalendar();
    })
  }

  transformTime(value: string): string {
    return this.timeTransformPipe.transform(value);
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };
  fillCalendar(){
    let values: any[] = [];

    for(let event of this.events){
      values.push({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end 
      })
    }
    this.calendarOptions.events = values;
  }

  transformDateTimeToDate(dateTime: Date): string {
    const isoString = dateTime.toISOString();
    const datePart = isoString.split('T')[0];
    return datePart;
  }

  openDetail(e: number) {
    const route = ['/', 'events', 'detail', e];
    this.router.navigate(route);
      return;
   
  }
}
