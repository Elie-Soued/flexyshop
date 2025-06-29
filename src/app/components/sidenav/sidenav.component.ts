import { Component, ViewChild } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { type Cart, type AppState } from '../../interface';
import { Store } from '@ngrx/store';
import { CartViewComponent } from '../../views/cartview/cartview.component';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatListModule,
    MatButtonModule,
    FontAwesomeModule,
    CartViewComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  cartIcon = faCartShopping;
  home = faHome;
  cart: Cart = [];
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private store: Store<AppState>,
    private utlilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.utlilsService.closeSideNav$.subscribe(() => {
      console.log('here');
      this.drawer.close();
    });

    this.store
      .select((state: AppState) => state.cart)
      .subscribe(({ items }) => {
        this.cart = items;
      });
  }
}
