import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsContactsComponent } from './events-contacts.component';

describe('EventsContactsComponent', () => {
  let component: EventsContactsComponent;
  let fixture: ComponentFixture<EventsContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
