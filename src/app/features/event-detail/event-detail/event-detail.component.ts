import {
  Component,

  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventsService } from '../../../core/services/events.service';
import { CartService } from '../../../core/services/cart.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Event } from '../../../core/models/event';
import { Session } from '../../../core/models/session';

import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';
import { ShoppingCartComponent } from '../../../shared/component/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent,ShoppingCartComponent],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDetailComponent implements OnInit {
  public eventDetail$!: Observable<{ event: Event; sessions: Session[] }>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly eventsService: EventsService,
    private readonly cartService: CartService,
    private readonly loadingService: LoadingService
  ) {}

  public ngOnInit(): void {
    this.eventDetail$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id: string | null = params.get('id');
        return this.eventsService.getEventInfo(id!);
      }),
      tap((detail) => {
        if (detail === null) {
          this.router.navigate(['/not-found']);
        }
      }),
      filter((detail): detail is { event: Event; sessions: Session[] } => detail !== null)
    );
  }

  public decrement(event: Event, sessionDate: number, availability: number): void {
    this.cartService.updateCart(event, sessionDate, availability, -1);
  }

  public increment(event: Event, sessionDate: number, availability: number): void {
    this.cartService.updateCart(event, sessionDate, availability, +1);
  }

  public getSessionQty(eventId: string, date: number): number {
    return this.cartService.getSessionQuantity(eventId, date);
  }
}
