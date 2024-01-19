import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganzationComponent } from './add-organzation.component';

describe('AddOrganzationComponent', () => {
  let component: AddOrganzationComponent;
  let fixture: ComponentFixture<AddOrganzationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrganzationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrganzationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
