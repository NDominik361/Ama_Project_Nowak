import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModule } from '../../model/Event'; 
import { environment } from 'src/app/enviornmets/enviornment';
import {firstValueFrom} from 'rxjs';
import { Contact } from 'src/app/model/Contact';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl: string = environment.serverUrl + '/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Promise<EventModule[]> {
    return firstValueFrom(this.http.get<EventModule[]>(this.apiUrl));
  }

  getEventById(id: number): Promise<EventModule> {
    return firstValueFrom(this.http.get<EventModule>(`${this.apiUrl}/${id}`));
  }

  editEvent(id: number, eventDetails: EventModule): Promise<EventModule> {
    return firstValueFrom(this.http.put<EventModule>(`${this.apiUrl}/${id}`, eventDetails));
  }

  deleteEvent(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  createEvent(event: EventModule): Promise<EventModule> {
    return firstValueFrom(this.http.post<EventModule>(this.apiUrl, event));
  }

  updateEvent(id: number, event: EventModule): Promise<EventModule> {
    return firstValueFrom(this.http.put<EventModule>(`${this.apiUrl}/${id}`, event));
  }
  addContactsToEvent(eventId: number, contactIds: number[]): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.apiUrl}/${eventId}/contacts`, contactIds));
  }
  getContactsByEvent(eventId:number):Promise<Contact[]>{
    return firstValueFrom(this.http.get<Contact[]>(`${this.apiUrl}/contacts/${eventId}`));

  }
  deleteContactsByEvent(eventId: number, contactIds: number[]): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${eventId}/contacts`, { body: contactIds }));
  }
}
