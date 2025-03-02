import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../../core/models/cart-item';
import { Cart } from '../../../core/models/cart';
import { SpinnerComponent } from "../../pages/spinner/spinner.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './shopping-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  public cartItems$!: Observable<CartItem[]>;

  constructor(private readonly cartService: CartService) {}

  public ngOnInit(): void {
    this.cartItems$ = this.cartService.cart$;
  }

  public removeOne(item: CartItem, c: Cart): void {
    this.cartService.updateCart(item.event, c.sessionDate, 9999, -1);
  }
}
