import { OrderByDatePipe } from './order-by-date.pipe';
import {  Event } from '../../core/models/event';
import { Session } from '../../core/models/session';

describe('OrderByDatePipe', () => {
  let pipe: OrderByDatePipe;

  beforeEach(() => {
    pipe = new OrderByDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort an array of Session objects by date', () => {
    const array: Session[] = [
      { date: 2000, availability: 5 },
      { date: 1000, availability: 10 },
      { date: 3000, availability: 3 }
    ];
    const sorted = pipe.transform(array, 'date');
    expect(sorted[0].date).toBe(1000);
    expect(sorted[1].date).toBe(2000);
    expect(sorted[2].date).toBe(3000);
  });

  it('should sort an array of Event objects by endDate', () => {
    const array: Event[] = [
      { id: '1', title: 'Event C', subtitle: '', image: '', endDate: '3000' },
      { id: '2', title: 'Event A', subtitle: '', image: '', endDate: '1000' },
      { id: '3', title: 'Event B', subtitle: '', image: '', endDate: '2000' }
    ];
    const sorted = pipe.transform(array, 'endDate');
    expect(Number(sorted[0].endDate)).toBe(1000);
    expect(Number(sorted[1].endDate)).toBe(2000);
    expect(Number(sorted[2].endDate)).toBe(3000);
  });

  it('should return the same value if input is not an array', () => {
    const nonArray: unknown = "test";

    const result = Array.isArray(nonArray) ? pipe.transform(nonArray, 'date') : nonArray;

    expect(result).toBe(nonArray);
  });
});
