import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderBodyComponent } from './reminder-body.component';

describe('ReminderBodyComponent', () => {
  let component: ReminderBodyComponent;
  let fixture: ComponentFixture<ReminderBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
