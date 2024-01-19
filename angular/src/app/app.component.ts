import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent {
  title = 'Sitrox';


  constructor() {
    // Initialization code can go here
  }

  menuItems = [
    { path: '/', title: 'Dashboard' },
  /*  { path: '/addcontact', title: 'Add Contact' },
    { path: '/addevent', title: 'Add Event' },
    { path: '/addorganization', title: 'Add Organization' },*/
    { path: '/contacts', title: 'Contacts' },
    { path: '/events', title: 'Events' },
    { path: '/organizations', title: 'Organizations' },
    { path: '/calendar', title: 'Calendar' }
  ];

  // Additional methods and properties can be added here
}
