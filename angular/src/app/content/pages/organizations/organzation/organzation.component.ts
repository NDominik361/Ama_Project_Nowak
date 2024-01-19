import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/service/organzaton/organization.service';
import { Router } from '@angular/router';
import { Organization } from 'src/app/model/Organization';
import { UntypedFormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickMessageService } from 'src/app/service/quick-message.service';
import { DataService } from 'src/app/service/data.service';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'organzation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AutoCompleteModule ],
  templateUrl: './organzation.component.html',
  styleUrls: ['./organzation.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class OrganzationComponent {

  organizationForm: UntypedFormGroup;
  organizationId: number = 0;
  isUpdate: boolean = false;
  organizations: Organization[] = [];
  organization: Organization | undefined;
  countriesSuggestions: any[] = [];
  countries: string [] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
    'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
    'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia',
    'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
    'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
    'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
    'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
      ];
  

  constructor(private fb: FormBuilder, private dataService: DataService, private organizationService: OrganizationService, private router: Router, private messageService: QuickMessageService) {
  
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      country: [''],
      region: [''],
      uid: [''],
      //email: [''],
      //website: ['']
    });
    this.checkAndStoreIdFromUrl();
  }

  ngOnInit(): void {
    this.organizations = this.dataService.getOrgs();
    if(this.organizations.length == 0  ){
      this.organizationService.getAllOrganizations().then((organizations: Organization[]) => {
        this.organizations = organizations;
      })
    }
  }

  private checkAndStoreIdFromUrl(): void {
    if (this.router.url.match(/^\/organizations\/detail\/(\d+)$/)) {
      this.isUpdate = true;
      this.organizationId = parseInt(RegExp.$1, 10);
      this.setOrganization();
    }
  }

  setOrganization() {
    this.organizationService.getOrganizationById(this.organizationId).then(organization => {
      this.organization = organization;
      this.setForm();
    })
  }

  createOrganization() {
    const organization: Organization = this.organizationForm?.value;
    this.organizationService.createOrganization(organization).then(r => {
      this.messageService.createSuccessMessage("Organization erfolgreich erstellt");
      this.router.navigate(['/organizations']);
    });
  }

  updateOrganization() {
    const organization: Organization = this.organizationForm?.value;
    this.organizationService.updateOrganization(this.organizationId, organization).then(r => {
      this.messageService.createSuccessMessage("Organization erfolgreich geändert");
      this.router.navigate(['/organizations']);
    });
  }

  
  forward(){
    const currentIndex = this.organizations.findIndex(o => o.id === this.organization?.id);
    if (currentIndex >= 0 && currentIndex < this.organizations.length - 1) {
      this.organization = this.organizations[currentIndex + 1];
      this.organizationId = this.organization.id;
      this.setForm();
  }
}

  backward(){
    const currentIndex = this.organizations.findIndex(o => o.id === this.organization?.id);
    if (currentIndex > 0 && currentIndex <= this.organizations.length - 1) {
      this.organization = this.organizations[currentIndex -1];
      this.organizationId = this.organization.id;
      this.setForm();
  }
  }
  
  setForm(){
    this.organizationForm = this.fb.group({
      name: [this.organization?.name, Validators.required],
      address: [this.organization?.address],
      country: [this.organization?.country],
      region: [this.organization?.region],
      uid: [this.organization?.uid],
     // email: [organization.email],
     // website: [organization.website]
    });
  }
  filterCountry(event: any){
    this.countriesSuggestions = this.countries;
    this.countriesSuggestions = this.countries.filter(country => 
      country.toLowerCase().includes(event?.query.toLowerCase()));
  }
}
