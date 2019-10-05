import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReminderModalComponent } from '../reminder-modal/reminder-modal.component';
import { ReminderListComponent } from '../reminder-list/reminder-list.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day: DayInformation;
  reminders: Reminder[] = []
  remindersToShow: Reminder[] = []

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showEventForm() {
    const modalRef = this.modalService.open(ReminderModalComponent);
    modalRef.result.then((result: Reminder) => {
      if (result.title) {
        this.reminders.push(result);
        this.remindersToShow = this.reminders.slice(0,2)  
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  showReminderList() {
    const modalRef = this.modalService.open(ReminderListComponent);
    modalRef.componentInstance.reminders = this.reminders;
    modalRef.result.then((console.log)).catch((console.log));
  }

}
