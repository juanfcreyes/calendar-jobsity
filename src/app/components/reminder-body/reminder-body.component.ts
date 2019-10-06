import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reminder-body',
  templateUrl: './reminder-body.component.html',
  styleUrls: ['./reminder-body.component.css']
})
export class ReminderBodyComponent implements OnInit {

  @Input() reminder: Reminder;

  constructor() { }

  ngOnInit() {
  }

}
