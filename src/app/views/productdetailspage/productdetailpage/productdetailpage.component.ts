import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productdetailpage',
  imports: [CurrencyPipe, DatePipe, FontAwesomeModule],
  templateUrl: './productdetailpage.component.html',
  styleUrl: './productdetailpage.component.css',
})
export class ProductdetailpageComponent {
  productID: number = 0;
  section: string = '';
  product: any = {};
  cart = faCartPlus;

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.activateRoute.params.subscribe((values) => {
      this.productID = values['id'];
      this.section = values['section'];
    });
  }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    console.log('do I get here?');
    this.http
      .get(`https://dummyjson.com/products/${this.productID}`)
      .subscribe({
        next: (response: any) => {
          this.product = response;
          console.log('this.product :>> ', this.product);
        },
        error: (err) => console.error('Error fetching products:', err),
      });
  }
}
