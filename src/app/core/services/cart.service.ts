import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Event } from '../models/event';
import { CartItem } from '../models/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly CART_KEY: string = 'cartData';

  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public readonly cart$ = this.cartSubject.asObservable();

  constructor(private readonly ls: LocalStorageService) {
    const data: CartItem[] = this.ls.getItem<CartItem[]>(this.CART_KEY) || [];
    this.cartSubject.next(data);
  }

  private saveAndEmit(data: CartItem[]): void {
    this.ls.setItem(this.CART_KEY, data);
    this.cartSubject.next(data);
  }

  public getCartData(): CartItem[] {
    return this.cartSubject.getValue();
  }

  public setCartData(data: CartItem[]): void {
    this.saveAndEmit(data);
  }

  public updateCart(event: Event, sessionDate: number, availability: number, delta: number): void {
    const cartData: CartItem[] = this.getCartData();

    let item: CartItem | undefined = cartData.find(x => x.event.id === event.id);
    if (!item) {
      item = { event, cart: [] };
      cartData.push(item);
    }

    let c = item.cart.find(cc => cc.sessionDate === sessionDate);
    if (!c) {
      c = { sessionDate, quantity: 0 };
      item.cart.push(c);
    }

    let newVal: number = c.quantity + delta;
    if (newVal < 0) {
      newVal = 0;
    }
    if (newVal > availability) {
      newVal = availability;
    }
    c.quantity = newVal;

    if (c.quantity === 0) {
      item.cart = item.cart.filter(cc => cc !== c);
    }
    if (item.cart.length === 0) {
      const idx: number = cartData.indexOf(item);
      if (idx >= 0) {
        cartData.splice(idx, 1);
      }
    }

    this.saveAndEmit(cartData);
  }

  public getSessionQuantity(eventId: string, sessionDate: number): number {
    const cartData: CartItem[] = this.getCartData();
    const item: CartItem | undefined = cartData.find(x => x.event.id === eventId);
    if (!item) {
      return 0;
    }
    const c = item.cart.find(cc => cc.sessionDate === sessionDate);
    return c ? c.quantity : 0;
  }
}
