import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationService } from 'src/app/service/organzaton/organization.service';

import { DatePipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Organization } from 'src/app/model/Organization';
import { Router } from '@angular/router';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'organization-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule],
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.scss'],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrganizationTableComponent {
  organizations: any[] = []
  constructor(private organizationService: OrganizationService, private dataService: DataService,private router: Router,private messageService: QuickMessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void { 
    this.organizationService.getAllOrganizations().then((organizations: any[]) => {
      this.organizations = organizations;
      this.dataService.setOrgs([...organizations]);
    })
  }

  deleteOrganization(organization: any) {
    this.confirmationService.confirm({
      key: 'orgConfirmationDialog',
      message: '<b>Möchten Sie diese Veranstaltung wirklich entfernen?</b>',
      header: 'Warnung',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Ja',
      rejectLabel: 'Abbrechen',
      rejectIcon: ' pi pi-times',
      rejectButtonStyleClass: 'cancel-button',
      accept: () => {
    this.organizationService.deleteOrganization(organization.id).then(r => {
      this.organizations.splice(this.organizations.findIndex(o => o.id === organization.id), 1);
      this.organizations = [...this.organizations];
      this.messageService.createSuccessMessage("Organization erfolgreich gelöscht");
    })},
      reject: () => {
        this.messageService.createErrorMessage("Organization konnte nicht gelöscht werden");
      }});
  }
  openRowDetail(event: Event, organization: Organization) {
    const route = ['/', 'organizations', 'detail', organization.id];
    const element = <HTMLElement>event.target;
    if (element && element.tagName == 'TD') {
      event.stopPropagation();
      this.router.navigate(route);
      return;
    } 
  }
  createOrg() {
    this.router.navigate(['/', 'addOrganization']);
    return;
  }
}
