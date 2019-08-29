import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';

import { AuthService } from './auth.service';
import { Event } from './event';
import { AlertsService } from './alerts.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphClient: Client;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService) {

    // Initialize the Graph client
    this.graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        let token = await this.authService.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  }

  async getEvents(): Promise<Event[]> {
    try {
      let result =  await this.graphClient
        .api('/me/events')
        .select('subject,organizer,start,end')
        .orderby('createdDateTime DESC')
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }

 async createEvents(values): Promise<Event[]> {
   var start_date = moment(values.start_date, "MM/DD/YYYY hh:mm A")
   .format('YYYY-MM-DDThh:mm:ss');
   var end_date = moment(start_date, "YYYY-MM-DDThh:mm:ss")
   .add(values.meeting_length, 'minutes')
   .format('YYYY-MM-DDThh:mm:ss');
    var event = {
      "subject": values.deal_name,
      "body": {
          "contentType": "HTML",
          "content": values.deal_desc
      },
      "start": {
          "dateTime": start_date,
          "timeZone": "Pacific Standard Time"
      },
      "end": {
          "dateTime": end_date,
          "timeZone": "Pacific Standard Time"
      },
      "location": {
          "displayName": "UA's Office"
      }
    }
    try {
      let result =  await this.graphClient
        .api('/me/events')
        .post(event);

      return result.value;
    } catch (error) {
      this.alertsService.add('Could not get events', JSON.stringify(error, null, 2));
    }
  }
}
