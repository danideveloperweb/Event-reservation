import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { Event } from '../models/event';
import { provideHttpClient } from '@angular/common/http';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EventsService,
      ],
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch events and sort them by endDate', () => {
    const dummyEvents: Event[] = [
      {
        id: '1',
        title: 'Event 1',
        subtitle: 'Sub 1',
        image: 'img1.jpg',
        endDate: '2000',
        startDate: '1000',
        description: 'Desc 1',
      },
      {
        id: '2',
        title: 'Event 2',
        subtitle: 'Sub 2',
        image: 'img2.jpg',
        endDate: '1000',
        startDate: '500',
        description: 'Desc 2',
      },
    ];

    service.getEvents().subscribe((events) => {
      expect(events.length).toBe(2);
      expect(events[0].id).toBe('2');
      expect(events[1].id).toBe('1');
    });

    const req = httpMock.expectOne('assets/data/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvents);
  });

  it('should fetch event info and transform sessions correctly', () => {
    const dummyResponse = {
      event: {
        id: '1',
        title: 'Event 1',
        subtitle: 'Sub 1',
        image: 'img1.jpg',
        endDate: '2000',
        startDate: '1000',
        description: 'Desc 1',
      },
      sessions: [
        { date: '2000', availability: '5' },
        { date: '1000', availability: '3' },
      ],
    };

    service.getEventInfo('1').subscribe((data) => {
      expect(data!.event.id).toBe('1');
      expect(data!.sessions.length).toBe(2);
      expect(data!.sessions[0].date).toBe(1000);
      expect(data!.sessions[1].date).toBe(2000);
      expect(data!.sessions[0].availability).toBe(3);
      expect(data!.sessions[1].availability).toBe(5);
    });

    const req = httpMock.expectOne('assets/data/event-info-1.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
