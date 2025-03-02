import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve an item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test', age: 30 };

    service.setItem(key, value);
    const storedValue = service.getItem(key);

    expect(storedValue).toEqual(value);
  });

  it('should return null if retrieving a non-existing key', () => {
    const result = service.getItem('nonExistingKey');
    expect(result).toBeNull();
  });
});
