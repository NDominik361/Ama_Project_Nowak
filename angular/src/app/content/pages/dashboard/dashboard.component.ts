import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventModule } from 'src/app/model/Event';
import { EventService } from 'src/app/service/events/event.service';
import { CommonModule,DatePipe } from '@angular/common';
import { WeatherService } from 'src/app/service/weather.service';
import { CarouselModule } from 'primeng/carousel';
import { TimeTransformPipe } from 'src/app/pipes/time-transform.pipe';
import { Router } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-dashboard',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[TimeTransformPipe, DatePipe],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class DashboardComponent {
  events: EventModule[] = [];

  constructor (private router: Router, private datePipe: DatePipe,private eventService: EventService, private weatherService: WeatherService,private timeTransformPipe: TimeTransformPipe) {

  }
  ngOnInit():void {
    this.eventService.getAllEvents().then((events: EventModule[]) => {
      this.events = events;
  });
  
  setTimeout(() => {
    for(let i:number = 0; i<this.events.length;i++){
      this.getActualWeather(i,this.events[i].location, this.events[i].start, this.events[i].end);
      setTimeout(() => {
        
      },100)
    }
  }, 500);

  }
  openDetail (e: EventModule) {
    const route = ['/', 'events', 'detail', e.id];
      this.router.navigate(route);
      return;
    
  }
  
  weatherForecasts: any[] = [];

  private getActualWeather(i:number,ort: string, start: Date, end: Date): void {
    this.weatherService.getWeather(ort,start,end).subscribe((weatherData: any) => {
      this.weatherForecasts[i] = weatherData;
      console.log(this.weatherForecasts);
    })
  }

  transformTime(value: string): string {
    return this.timeTransformPipe.transform(value);
  }


  transformDateTimeToDate(dateTime: Date): string {
    let formattedDate = this.datePipe.transform(dateTime, 'dd.MM.yyyy');
    if(formattedDate == null){
      formattedDate = '';
    }
    return formattedDate;
  }


}
