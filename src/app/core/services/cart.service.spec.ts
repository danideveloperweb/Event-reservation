import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { LocalStorageService } from './local-storage.service';
import { Event } from '../models/event';
import { CartItem } from '../models/cart-item';

describe('CartService', () => {
  let service: CartService;
  let localStorageMock: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageMock = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: LocalStorageService, useValue: localStorageMock }
      ]
    });

    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the cart with data from LocalStorage', () => {
    const mockCartData: CartItem[] = [
      { event: createMockEvent('1'), cart: [{ sessionDate: 123456, quantity: 2 }] }
    ];
    localStorageMock.getItem.and.returnValue(mockCartData);

    const newService = new CartService(localStorageMock);
    expect(newService.getCartData()).toEqual(mockCartData);
  });

  it('should add a new event to the cart', () => {
    localStorageMock.getItem.and.returnValue([]);

    const event: Event = createMockEvent('2');
    service.updateCart(event, 123456, 10, 1);

    const cartData = service.getCartData();
    expect(cartData.length).toBe(1);
    expect(cartData[0].event.id).toBe('2');
    expect(cartData[0].cart[0].quantity).toBe(1);
  });

  it('should update the quantity of an existing event in the cart', () => {
    localStorageMock.getItem.and.returnValue([]);

    const event: Event = createMockEvent('3');
    service.updateCart(event, 123456, 10, 2);
    service.updateCart(event, 123456, 10, 3);

    const cartData = service.getCartData();
    expect(cartData.length).toBe(1);
    expect(cartData[0].cart[0].quantity).toBe(5);
  });

  it('should remove an event from the cart when quantity is 0', () => {
    localStorageMock.getItem.and.returnValue([]);

    const event: Event = createMockEvent('4');
    service.updateCart(event, 123456, 10, 2);
    service.updateCart(event, 123456, 10, -2);

    const cartData = service.getCartData();
    expect(cartData.length).toBe(0);
  });

  it('should limit the quantity of an event to the maximum available', () => {
    localStorageMock.getItem.and.returnValue([]);

    const event: Event = createMockEvent('5');
    service.updateCart(event, 123456, 5, 10);

    const cartData = service.getCartData();
    expect(cartData[0].cart[0].quantity).toBe(5);
  });

  it('should return the correct quantity of an event for a specific session', () => {
    localStorageMock.getItem.and.returnValue([]);

    const event: Event = createMockEvent('6');
    service.updateCart(event, 111111, 10, 3);

    expect(service.getSessionQuantity('6', 111111)).toBe(3);
    expect(service.getSessionQuantity('6', 222222)).toBe(0);
  });

  function createMockEvent(id: string): Event {
    return {
      id,
      name: `Event ${id}`,
      title: `Event Title ${id}`,
      subtitle: `Event Subtitle ${id}`,
      image: `image-url-${id}.jpg`
    } as Event;
  }
});
