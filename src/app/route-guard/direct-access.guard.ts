import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DirectAccessGuard implements CanActivate {

    constructor(private readonly _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._router.url === "/") {
            this._router.navigate(['/scan']);
            return false;
        } else {
            return true;
        }
    }
}