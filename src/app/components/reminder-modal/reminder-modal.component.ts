import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '../../services/city.service';
import { colorOptions } from './color-options';
import { WeatherService } from '../../services/weather.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.css']
})

export class ReminderModalComponent implements OnInit {

  @Input() reminder: Reminder;
  colors = colorOptions;
  cities: any;
  weather: any = {};

  constructor(public activeModal: NgbActiveModal, public cityService: CityService,
    public weatherService: WeatherService) { }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    if (!this.reminder) {
      this.reminder = {
        time: { hour: 0, minute: 0 },
        color: {}
      };
    }
  }

  save() {
    if (!this.reminder.city || !this.reminder.title) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Data',
        text: 'Tittle and city are required'
      });
    } else {
      this.reminder.timeMilliseconds = Number(moment.duration(this.reminder.time));
      this.activeModal.close(this.reminder);
    }
  }

  searchWeather() {
    this.weatherService.getWeatherInformation(this.reminder.city.id)
      .subscribe((data: any) => {
        const iconURL = 'http://openweathermap.org/img/wn';
        this.weather.icon = `${iconURL}/${data.list[0].weather[0].icon}@2x.png`;
        this.weather.description = data.list[0].weather[0].description;
        this.reminder.weather = this.weather;
      });
  }
}

