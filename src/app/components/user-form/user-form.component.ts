import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  user: User;

  errors: any;

  constructor(private sharingData: SharingDataService, private router: Router){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    }else{
      this.user = new User();
    }
  }
  ngOnInit(): void {
    this.sharingData.errorEmitterEvent.subscribe(e => this.errors = e);
  }

  onSubmit(userForm: NgForm){
    if (userForm.valid){
      this.sharingData.UserEvent.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm){
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
