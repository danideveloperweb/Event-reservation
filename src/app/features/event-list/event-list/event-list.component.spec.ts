import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventsService } from '../../../core/services/events.service';
import { of } from 'rxjs';
import { Event } from '../../../core/models/event';
import { ElementRef, QueryList } from '@angular/core';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let eventsServiceSpy: jasmine.SpyObj<EventsService>;

  beforeEach(async () => {
    eventsServiceSpy = jasmine.createSpyObj('EventsService', ['getEvents']);

    await TestBed.configureTestingModule({
      imports: [EventListComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: EventsService, useValue: eventsServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on init', () => {
    const mockEvents: Event[] = [
      { id: '1', title: 'Event 1', subtitle: 'Subtitle 1', image: 'image1.jpg' },
      { id: '2', title: 'Event 2', subtitle: 'Subtitle 2', image: 'image2.jpg' }
    ];

    eventsServiceSpy.getEvents.and.returnValue(of(mockEvents));

    component.ngOnInit();
    component.events$.subscribe(events => {
      expect(events).toEqual(mockEvents);
    });
  });

  it('should adjust heights correctly', () => {
    const mockElements = [
      { nativeElement: { offsetHeight: 50, style: { height: '' } } },
      { nativeElement: { offsetHeight: 75, style: { height: '' } } },
      { nativeElement: { offsetHeight: 100, style: { height: '' } } }
    ] as unknown as QueryList<ElementRef>;

    component.descEls = mockElements;
    component.adjustHeights();

    mockElements.forEach(el => {
      expect(el.nativeElement.style.height).toBe('100px');
    });
  });

  it('should call ngOnDestroy without errors', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
