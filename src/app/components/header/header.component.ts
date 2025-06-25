import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FontAwesomeModule, SidenavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  home = faHome;
}
