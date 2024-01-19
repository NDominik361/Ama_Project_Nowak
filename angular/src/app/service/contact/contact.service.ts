import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../model/Contact';
import { environment } from 'src/app/enviornmets/enviornment';

import {firstValueFrom} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl: string = environment.serverUrl + '/contacts';

  constructor(private http: HttpClient) {}

  
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: number): Promise<Contact> {
    return firstValueFrom(this.http.get<Contact>(`${this.apiUrl}/${id}`));
  }


  createContact(contact: Contact): Promise<Contact> {
    return firstValueFrom(this.http.post<Contact>(this.apiUrl, contact));
  }

  updateContact(id:number,contact: Contact): Promise<Contact> {
    return firstValueFrom(this.http.put<Contact>(`${this.apiUrl}/${id}`, contact));
  }

  deleteContact(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  getContactsByEvent(eventId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/events/${eventId}`);
  }
}
