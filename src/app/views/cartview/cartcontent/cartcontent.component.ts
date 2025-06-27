import { Component, Input } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { ItemOutOfStock } from '../../../store/store.actions';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { type CartItem, type AppState, type Cart } from '../../../interface';
import { UtilsService } from '../../../services/utils.service';
import { Store } from '@ngrx/store';
import { faTrash, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cartcontent',
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './cartcontent.component.html',
  styleUrl: './cartcontent.component.css',
})
export class CartcontentComponent {
  @Input({ required: true }) cart!: Cart;
  trash = faTrash;
  add = faAdd;
  minus = faMinus;

  constructor(
    private store: Store<AppState>,
    public utilsService: UtilsService,
    private itemService: ItemService
  ) {}

  addItem(cartItem: CartItem): void {
    let stock = this.itemService.getItemInStock(cartItem.id);
    if (stock && stock > 0) {
      this.itemService.addItemToCart(cartItem);
    } else {
      this.store.dispatch(
        ItemOutOfStock({ id: cartItem.id, isOutOfStock: true })
      );
    }
  }

  removeItem(cartItem: CartItem): void {
    this.itemService.removeItemFromCart(cartItem);
  }

  reduceItemBuyCount(cartItem: CartItem): void {
    this.itemService.reduceItemBuyCount(cartItem);
    let stock = this.itemService.getItemInStock(cartItem.id);
    if (stock && stock > 0) {
      this.store.dispatch(
        ItemOutOfStock({ id: cartItem.id, isOutOfStock: false })
      );
    }
  }
}
