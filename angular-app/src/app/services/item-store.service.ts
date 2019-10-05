import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {

  // tslint:disable-next-line: variable-name
  private readonly _items = new BehaviorSubject<Item[]>([]);

  public readonly items$ = this._items.asObservable();

  private get items(): Item[] {
    return this._items.getValue();
  }

  private set items(val: Item[]) {
    this._items.next(val);
  }

  add(item: Item) {
    this.items = [
      ...this.items,
      item
    ];
  }

  update(updatedItem: Item) {
    if (!this.items.find(x => x.id === updatedItem.id)) {
      this.add(updatedItem);
      return;
    }

    this.items = this.items.map((item, index) => {
      if (item.id !== updatedItem.id) {
        return item;
      }
      return updatedItem;
    });
  }

  remove(item: Item) {
    this.items = this.items.filter(x => x.id !== item.id);
  }
}
