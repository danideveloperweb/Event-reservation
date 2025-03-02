import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventsService } from '../../../core/services/events.service';
import { Event } from '../../../core/models/event';
import { SpinnerComponent } from "../../../shared/pages/spinner/spinner.component";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  events$!: Observable<Event[]>;
  @ViewChildren('descRef') descEls!: QueryList<ElementRef>;
  private resizeSub!: Subscription;
  private descChangesSub!: Subscription;

  constructor(private eventsService: EventsService) {}

 public ngOnInit(): void {
    this.events$ = this.eventsService.getEvents();
  }

  public ngAfterViewInit(): void {
    this.descChangesSub = this.descEls.changes.subscribe(() => this.adjustHeights());
    setTimeout(() => this.adjustHeights(), 0);
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.adjustHeights());
  }

  public adjustHeights(): void {
    let maxHeight = 0;
    this.descEls.forEach(el => {
      const h = el.nativeElement.offsetHeight;
      if (h > maxHeight) {
        maxHeight = h;
      }
    });
    if (maxHeight > 0) {
      this.descEls.forEach(el => {
        el.nativeElement.style.height = `${maxHeight}px`;
      });
    }
  }

  public ngOnDestroy(): void {
    this.resizeSub?.unsubscribe();
    this.descChangesSub?.unsubscribe();
  }
}
