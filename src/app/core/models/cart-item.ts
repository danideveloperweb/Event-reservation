import { Cart } from "./cart";
import { Event } from './event';
export interface CartItem {
  event: Event;
  cart: Cart[];
}
