import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilsService } from '../../services/utils.service';
import { type Reviews, type Product } from '../../interface';

@Component({
  selector: 'app-stars',
  imports: [FontAwesomeModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css',
})
export class StarsComponent {
  star = faStar;
  @Input({ required: true }) product!: Reviews | Product;

  constructor(public utilsService: UtilsService) {}
}
