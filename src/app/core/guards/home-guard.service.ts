import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate{

  constructor(private auth: AngularFireAuth, private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    try {
      const currentUser = await this.auth.currentUser
      if(currentUser){
        console.log(true)
        return true;
      }else {
        console.log(false)
        this.router.navigate(['login'])
        return false;
      }
    } catch (error) {
      console.log(true, 'trye')
      return false;
    }
  }
}
