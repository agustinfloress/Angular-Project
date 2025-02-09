import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() users: User[] = [];

  constructor(private authService: AuthService, private router: Router){

  }
  get login(){
    return this.authService.user;
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
