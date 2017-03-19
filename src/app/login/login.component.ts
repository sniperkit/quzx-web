import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../common/services/user.service'

@Component({
  moduleId: module.id,
  selector: 'login',
  template:
    `
    <div>
      <form #loginForm="ngForm" (ngSubmit)="login()">
        <div>
          <label for="username">Username:</label>
          <input [(ngModel)]="username" id="username" name="username" type="text"/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input [(ngModel)]="password" id="password" name="password" type="text"/>
        </div>
        <button type="submit">Login</button>
      </form>      
    </div>
  `,
  styles: [`                   
   
`],
  providers: [UserService]
})

export class LoginComponent {

  username: string;
  password: string;

  constructor(private userService: UserService,
              private router: Router) {
    this.username = "";
    this.password = "";
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe(
        (result) => this.router.navigate(['/torrents']),
        (err) => this.router.navigate(['/login']));
  }
}
