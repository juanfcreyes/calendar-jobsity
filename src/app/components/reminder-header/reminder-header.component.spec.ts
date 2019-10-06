import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderHeaderComponent } from './reminder-header.component';

describe('ReminderHeaderComponent', () => {
  let component: ReminderHeaderComponent;
  let fixture: ComponentFixture<ReminderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
