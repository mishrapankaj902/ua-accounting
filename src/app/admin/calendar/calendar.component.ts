import { LoaderService } from './../../services/loader.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment-timezone';

import { GraphService } from '../../graph.service';
import { Event, DateTimeTimeZone } from '../../event';
import { AlertsService } from '../../alerts.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[];
  authenticated = false;
  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.authService.getAccessToken().then(d => {
      if (d) {
        this.authenticated = true;
        this.loader.loader(true)
        this.graphService.getEvents()
        .then((events) => {
          this.events = events;
          this.loader.loader(false)
          });
      }
    })
  }

  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    }
    catch (error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    // this.ngOnInit();
  }
}