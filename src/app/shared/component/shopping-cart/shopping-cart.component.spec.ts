import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CartService } from '../../../core/services/cart.service';
import { of } from 'rxjs';
import { CartItem } from '../../../core/models/cart-item';
import { Cart } from '../../../core/models/cart';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['updateCart'], {
      cart$: of([
        { event: { id: '1', title: 'Event 1', subtitle: 'Subtitle 1', image: 'image1.jpg' }, cart: [{ sessionDate: 123456, quantity: 2 }] },
        { event: { id: '2', title: 'Event 2', subtitle: 'Subtitle 2', image: 'image2.jpg' }, cart: [{ sessionDate: 789012, quantity: 1 }] }
      ])
    });

    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on init', (done) => {
    component.cartItems$.subscribe(cartItems => {
      expect(cartItems.length).toBe(2);
      expect(cartItems[0].event.id).toBe('1');
      expect(cartItems[1].event.id).toBe('2');
      done();
    });
  });

  it('should call updateCart when removing an item', () => {
    const mockCartItem: CartItem = { event: { id: '1', title: 'Event 1', subtitle: 'Subtitle 1', image: 'image1.jpg' }, cart: [] };
    const mockCart: Cart = { sessionDate: 123456, quantity: 2 };

    component.removeOne(mockCartItem, mockCart);

    expect(cartServiceSpy.updateCart).toHaveBeenCalledWith(mockCartItem.event, mockCart.sessionDate, 9999, -1);
  });
});
