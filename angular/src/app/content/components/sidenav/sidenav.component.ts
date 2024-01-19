import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'crm-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']  
})
export class SidenavComponent {
  ngOnInit() {
    console.log('SidenavComponent initialized');
  }

  
  attributesList: { link: string; text: string }[] = [
    { link: '/contacts', text: 'Kontakte' },
    { link: '/organizations', text: 'Organizatione' },
    { link: '/events', text: 'Veranstaltungen' },
    { link: '/calendar', text: 'Kalendar' }
  ];

  constructor() {}
}
