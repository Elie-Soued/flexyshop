import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearCart } from '../../store/store.actions';
import { type AppState } from '../../interface';

@Component({
  selector: 'app-successpage',
  imports: [],
  templateUrl: './successpage.component.html',
  styleUrl: './successpage.component.css',
})
export class SuccesspageComponent implements OnInit {
  emoji = '🎉';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(clearCart());
  }
}
