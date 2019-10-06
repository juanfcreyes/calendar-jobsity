import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReminderFormComponent } from '../modals/reminder-form/reminder-form.component';
import { ReminderListComponent } from '../modals/reminder-list/reminder-list.component';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day: DayInformation;
  reminders: Reminder[] = []
  remindersToShow: Reminder[] = []

  constructor(private modalService: NgbModal, private messageService: MessageService) { }

  ngOnInit() {
  }

  showEventForm() {
    const modalRef = this.modalService.open(ReminderFormComponent, {backdrop : 'static', keyboard : false});
    modalRef.result.then((result: Reminder) => {
      this.reminders.push(result);
      this.sortReminders();
    }).catch((console.log));
  }

  editReminder(reminder: Reminder, index: number) {
    const modalRef = this.modalService.open(ReminderFormComponent, {backdrop : 'static', keyboard : false});
    modalRef.componentInstance.reminder = JSON.parse(JSON.stringify(reminder));
    modalRef.result.then((result: Reminder) => {
      this.reminders[index] = result;
      this.sortReminders()
    }).catch(console.log);
  }

  sortReminders() {
    this.reminders = this.reminders.sort((a: Reminder, b: Reminder) => a.timeMilliseconds - b.timeMilliseconds);
    this.remindersToShow = this.reminders.slice(0, 3);
  }

  showReminderList() {
    const modalRef = this.modalService.open(ReminderListComponent, {backdrop : 'static', keyboard : false});
    modalRef.componentInstance.reminders = this.reminders;
    modalRef.result.then(() => this.sortReminders()).catch(console.log);
  }

  deleteAllReminders() {
    this.messageService.showConfirmAlert('Do you want to delete all reminders?')
      .then((result) => {
        if (result.value) {
          this.reminders = [];
          this.remindersToShow = [];
        }
      });
  }

  deleteReminder(index: number) {
    this.messageService.showConfirmAlert('Do you want to delete the selected reminder?')
      .then((result) => {
        if (result.value) {
          this.reminders.splice(index, 1);
          this.sortReminders();
        }
      });
  }
}
