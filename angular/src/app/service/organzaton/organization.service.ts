import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../../model/Organization';
import { environment } from 'src/app/enviornmets/enviornment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl: string = environment.serverUrl + '/organizations';

  constructor(private http: HttpClient) {}

  getAllOrganizations(): Promise<Organization[]> {
    return firstValueFrom(this.http.get<Organization[]>(this.apiUrl));
  }

  getOrganizationById(id: number): Promise<Organization> {
    return firstValueFrom(this.http.get<Organization>(`${this.apiUrl}/${id}`));
  }

  editOrganization(id: number, organizationDetails: Organization): Promise<Organization> {
    return firstValueFrom(this.http.put<Organization>(`${this.apiUrl}/${id}`, organizationDetails));
  }

  deleteOrganization(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  createOrganization(organization: Organization): Promise<Organization> {
    return firstValueFrom(this.http.post<Organization>(this.apiUrl, organization));
  }

  updateOrganization(id: number, organization: Organization): Promise<Organization> {
    return firstValueFrom(this.http.put<Organization>(`${this.apiUrl}/${id}`, organization));
  }

}
