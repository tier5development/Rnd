import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users = ["User A","User B","User C"]

  addUser(newUser:string){
    if(newUser){
      this.users.push(newUser);
    }
  }

  deleteUser(){
    let item: number = this.users.length;
    this.users.splice(item-1);
  }

}
