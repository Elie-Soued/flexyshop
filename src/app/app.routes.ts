import { Routes } from '@angular/router';
import { LandingpageComponent } from './views/landingpage/landingpage.component';
import { ProductspageComponent } from './views/productspage/productspage.component';
import { CheckoutpageComponent } from './views/checkoutpage/checkoutpage.component';
import { ProductdetailpageComponent } from './views/productdetailspage/productdetailpage.component';
import { SuccesspageComponent } from './views/successpage/successpage.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'section/:name', component: ProductspageComponent },
  { path: ':section/:id', component: ProductdetailpageComponent },
  { path: 'checkout', component: CheckoutpageComponent },
  { path: 'success', component: SuccesspageComponent },
];
