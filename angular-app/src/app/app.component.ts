import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SignalRService } from './services/signal-r.service';
import { ItemStoreService } from './services/item-store.service';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private signalrService: SignalRService,
    private itemStoreService: ItemStoreService
  ) {
  }

  public trackByItemId(index: number, item: Item): number {
    return item.id;
  }
}
