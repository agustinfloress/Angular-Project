import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user!: User;

  constructor(private sharingData: SharingDataService){
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validación',
        'Username y password requeridos',
        'error'
      )
    }else{
      this.sharingData.handlerLoginEvent.emit({username: this.user.username, password: this.user.password});
    }
  }

}
