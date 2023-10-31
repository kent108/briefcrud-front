import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
  ) {}
  onLogout(): void {
    console.log('Logout');

    this.userService.logout();
    this.userService.setLoggedIn(false);
  }
}
