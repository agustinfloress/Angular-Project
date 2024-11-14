import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  title: string = 'Listado de usuarios'
  
  users: User[] = [];

  totalPages: number = 0;

  currentPage: number = 0;
  
  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService,
    private authService: AuthService
  ){
      //this.service.findAll().subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  onRemove(user: User){
    this.sharingData.RemoveuserEvent.emit(user);
  }

  onUpdate(user: User){
    this.router.navigate(['/users/create'], {state: {user}});
  }

  onNext(){
    this.loadPage(this.currentPage+1)
  }

  onPrev(){
    this.loadPage(this.currentPage-1)
  }

  loadPage(page: number){
    this.service.findAllPage(page).subscribe(response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = page;
    })
  }

  isAdmin(){
    return this.authService.isAdmin();
  }
  }

  
