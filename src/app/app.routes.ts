import { Routes } from '@angular/router';
import { LandingpageComponent } from './views/landingpage/landingpage/landingpage.component';
import { ProductspageComponent } from './views/productspage/productspage/productspage.component';
import { ProductdetailpageComponent } from './views/productdetailspage/productdetailpage/productdetailpage.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'section/:name', component: ProductspageComponent },
  { path: ':section/:id', component: ProductdetailpageComponent },
];
