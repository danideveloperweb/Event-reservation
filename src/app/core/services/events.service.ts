import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Event } from '../models/event';
import { Session } from '../models/session';
import { OrderByDatePipe } from '../../shared/pipes/order-by-date.pipe';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly http: HttpClient = inject(HttpClient);

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('assets/data/events.json').pipe(
      map((events: Event[]): Event[] => OrderByDatePipe.sortArray(events, 'endDate'))
    );
  }

  public getEventInfo(eventId: string): Observable<{ event: Event; sessions: Session[] } | null> {
    return this.http
      .get<{ event: Event; sessions: { date: string; availability: string }[] }>(
        `assets/data/event-info-${eventId}.json`
      )
      .pipe(
        map(response => ({
          event: response.event,
          sessions: OrderByDatePipe.sortArray(
            response.sessions.map(s => ({
              date: Number(s.date),
              availability: Number(s.availability)
            })),
            'date'
          )
        })),
        catchError((): Observable<null> => of(null))
      );
  }
}
