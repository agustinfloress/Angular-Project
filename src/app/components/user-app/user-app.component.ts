import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { state } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{
  
  users: User[] = [];
  
  constructor(private service: UserService, 
    private sharingData: SharingDataService,
    private router: Router,
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.service.findAll().subscribe(u => this.users = u);   
    this.addUser();
    this.onRemove();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEvent.subscribe(({username, password}) => {
      console.log(username + ' ' + password);
      this.authService.loginUser({username, password}).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          const payload = JSON.parse(atob(token.split(".")[1]));

          const user = {username: payload.sub};
          const login = {
            user: user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          console.log(login);
          
          this.authService.setUser(login);
          this.authService.setToken(token);


          this.router.navigate(['/users']);
        },
        error: err => {
          if(err.status == 401){
            Swal.fire('Error en el Login', 'Username o PW incorrectos', 'error');
          }
          else{
            throw err;
          }
        }
      })
    })
  }
  
    addUser() {
      this.sharingData.UserEvent.subscribe(user => {
        if (user.id != null) {
          this.service.update(user).subscribe({
            next: userUpd => {
              this.users = this.users.map(u => {
                if (u.id == userUpd.id) {
                  return { ...userUpd };
                } else {
                  return u;
                }
              });
              this.router.navigate(['/users']);
              Swal.fire({
                title: "Guardado!",
                text: "Usuario guardado con éxito!",
                icon: "success"
              });
            },
            error: (err) => {
              this.sharingData.errorEmitterEvent.emit(err.error);
            }
          });
        } else {
          this.service.create(user).subscribe({
            next: userCreated => {
              this.users = [...this.users, { ...userCreated }];
              this.router.navigate(['/users']);
              Swal.fire({
                title: "Guardado!",
                text: "Usuario guardado con éxito!",
                icon: "success"
              });
            },
            error: (err) => {
              this.sharingData.errorEmitterEvent.emit(err.error);
            }
          });
        }
    
      });
    }
  
  onRemove(){
    this.sharingData.RemoveuserEvent.subscribe(user => {
      this.service.delete(user.id).subscribe(userDeleted => {
        this.users = this.users.filter(u => u.id!= userDeleted.id)
      });
      this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
        this.router.navigate(['/users']);
      })
    })
  }
  
  

}
