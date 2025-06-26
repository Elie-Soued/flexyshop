import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../interface';
import { RouterModule } from '@angular/router';
import { type AppState, type CartItem } from '../../interface';
import { ItemService } from '../../services/item.service';
import { ItemOutOfStock } from '../../store/store.actions';

@Component({
  selector: 'app-productspage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css',
})
export class ProductspageComponent implements OnInit {
  section: string = '';
  products: Product[] = [];
  categoryProducts: Product[] = [];
  home = faHome;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>,
    private itemService: ItemService
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.section = values['name'];
    });
  }

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        this.categoryProducts = products.filter(
          (product: Product) => product.category === this.section
        );
      });
  }

  addItem(cartItem: Product): void {
    let stock = this.itemService.getItemInStock(cartItem.id);
    if (stock && stock > 0) {
      this.itemService.addItemToCart(cartItem);
    } else {
      this.store.dispatch(
        ItemOutOfStock({ id: cartItem.id, isOutOfStock: true })
      );
    }
  }
}
