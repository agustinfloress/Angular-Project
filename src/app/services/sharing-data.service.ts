import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {


  private userEvent: EventEmitter<User> = new EventEmitter();

  private removeuserEvent: EventEmitter<User> = new EventEmitter();

  private errorEmitter = new EventEmitter();

  private handlerLogin = new EventEmitter();

  constructor() { }

  get UserEvent(){
    return this.userEvent;
  }

  get RemoveuserEvent(){
    return this.removeuserEvent;
  }

  get errorEmitterEvent(){
    return this.errorEmitter;
  }

  get handlerLoginEvent(){
    return this.handlerLogin;
  }

}
