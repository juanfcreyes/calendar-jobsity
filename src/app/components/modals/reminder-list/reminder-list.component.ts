import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../services/message.service';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})

export class ReminderListComponent implements OnInit {

  @Input() reminders: Reminder[] = [];

  constructor(public activeModal: NgbActiveModal,
    private messageService: MessageService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  editReminder(reminder: Reminder, index: number) {
    const modalRef = this.modalService.open(ReminderFormComponent, {backdrop : 'static', keyboard : false});
    modalRef.componentInstance.reminder = JSON.parse(JSON.stringify(reminder));
    modalRef.result.then((result: Reminder) => {
      this.reminders[index] = result;
      this.reminders = this.reminders.sort((a: Reminder, b: Reminder) => a.timeMilliseconds - b.timeMilliseconds);
    }).catch(console.log);
  }

  deleteReminder(index: number) {
    this.messageService.showConfirmAlert('Do you want to delete the selected reminder?')
      .then((result) => {
        if (result.value) {
          this.reminders.splice(index, 1);
          this.reminders = this.reminders.sort((a: Reminder, b: Reminder) => a.timeMilliseconds - b.timeMilliseconds);
        }
      });
  }

}
