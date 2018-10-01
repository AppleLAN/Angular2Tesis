import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

@Injectable()
export class HasCompanyGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private authguard: AuthGuard
  ) {}

  canActivate() {
    if (this.authguard.canActivate()) {
      return this.userService.getProfileInfo().map(response => {
        if (response) {
          // login successful
          if (response.profile.company_id === null) {
            this.router.navigate(['/register-company']);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }
}
