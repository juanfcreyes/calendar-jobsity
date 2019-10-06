import { Component } from '@angular/core';
import { CityService } from './services/city.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.metareducer';
import { setCities } from './store/actions/city.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'jobsity-calendar';

  constructor(private cityService: CityService, private store: Store<AppState> ) {
    this.cityService.getCities().subscribe((cities: City[]) => {
      this.store.dispatch(setCities({ cities }));
    });
  }

}
