import { Component, OnInit } from '@angular/core';
import { faHome, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store.reducer';
import { clearCart } from '../../store/store.actions';

@Component({
  selector: 'app-successpage',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './successpage.component.html',
  styleUrl: './successpage.component.css',
})
export class SuccesspageComponent implements OnInit {
  home = faHome;
  checkCircle = faCheckCircle;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(clearCart());
  }
}
