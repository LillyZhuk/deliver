import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router,
        private storage: Storage,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.authService.loggenIn()) {
            return true;
        } else {
            this.storage.remove('token');
            this.router.navigateByUrl('auth');
            return false
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }
}
