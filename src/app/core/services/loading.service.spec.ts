import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with "false" state', (done) => {
    service.loading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should set state to "true" when show() is called', (done) => {
    service.show();

    service.loading$.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should set state to "false" when hide() is called', (done) => {
    service.show();
    service.hide();

    service.loading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should emit values in the correct sequence: "false" → "true" → "false"', (done) => {
    const expectedSequence = [false, true, false];
    let index = 0;

    service.loading$.subscribe((isLoading) => {
      expect(isLoading).toBe(expectedSequence[index]);
      index++;
      if (index === expectedSequence.length) {
        done();
      }
    });

    service.show();
    service.hide();
  });
});
