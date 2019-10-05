import { Injectable } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import { ItemStoreService } from './item-store.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor(private itemStoreService: ItemStoreService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/hub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.addItemUpdatedListener();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addItemUpdatedListener = () => {
    this.hubConnection.on('ItemUpdated', (item) => {
      this.itemStoreService.update(item);
    });
  }
}
