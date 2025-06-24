import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { type Cart } from '../../interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store.reducer';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartIcon = faCartShopping;
  home = faHome;
  cart: Cart[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.cart)
      .subscribe(({ items }) => {
        this.cart = items;
      });
  }
}
