import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../model/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string = '/api/contacts';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  editContact(id: number, contactDetails: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contactDetails);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getContactsByEvent(eventId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/events/${eventId}`);
  }
}
