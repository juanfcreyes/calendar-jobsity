import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '../../../services/city.service';
import { colorOptions } from '../../../constants/color-options';
import { WeatherService } from '../../../services/weather.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.metareducer';
import { CityState, cityState } from '../../../store/reducers/city.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})

export class ReminderFormComponent implements OnInit, OnDestroy {

  cityStateSubscription: Subscription;
  @Input() reminder: Reminder;
  colors = colorOptions;
  weather: Weather = {};
  cities: City[];
  city: City;

  constructor(public activeModal: NgbActiveModal, public cityService: CityService,
    public weatherService: WeatherService, private store: Store<AppState>) { }

  ngOnInit() {
    this.cityStateSubscription = this.store.select('cityState').subscribe((store: CityState ) => {
      this.cities = store.cities;
      this.initDefafultData();
    });
  }

  ngOnDestroy() {
    this.cityStateSubscription.unsubscribe();
  }

  initDefafultData() {
    if (!this.reminder) {
      this.city = { id: 0 };
      this.reminder = {
        time: { hour: 0, minute: 0 },
        color: colorOptions[0],
      };
    } else {
      this.weather = this.reminder.weather;
      this.city = this.searchCity();
      this.reminder.color = this.searchColor();
    }
  }

  searchCity() : City {
    return this.cities.find((city) => city.id === this.reminder.city.id);
  }

  searchColor() : Color {
    return colorOptions.find((color) => color.option === this.reminder.color.option);
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
      this.activeModal.close({ ... this.reminder });
    }
  }

  searchWeather() {
    this.weatherService.getWeatherInformation(this.city.id)
      .subscribe((data: any) => {
        const iconURL = 'http://openweathermap.org/img/wn';
        this.weather.icon = `${iconURL}/${data.list[0].weather[0].icon}@2x.png`;
        this.weather.description = data.list[0].weather[0].description;
        this.reminder.city = { ... this.city };
        this.reminder.weather = this.weather;
      });
  }
}

