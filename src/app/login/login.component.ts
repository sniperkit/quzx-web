import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../common/services/user.service'

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
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
