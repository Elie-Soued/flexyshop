import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productspage',
  imports: [FontAwesomeModule],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css',
})
export class ProductspageComponent {
  section: string = '';
  products: any;
  home = faHome;

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.activateRoute.params.subscribe((values) => {
      this.section = values['name'];
    });
  }

  ngOnInit() {
    this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.http
      .get(`https://dummyjson.com/products/category/${this.section}`)
      .subscribe({
        next: (response: any) => {
          this.products = response.products;
        },
        error: (err) => console.error('Error fetching products:', err),
      });
  }
}
