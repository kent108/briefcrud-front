import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable();
  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/connect']);
      return of(false);
    }
    return this.authService.validateToken(token).pipe(
      map((response) => {
        console.log(
          'je suis dans le guard et la reponse du service : ',
          response
        );

        // Vérifiez d'abord la validité du token
        if (!response || response.valid !== true) {
          console.log('je suis dans le guard et le token est invalide');
          this.router.navigate(['/login']);
          return false;
        }

        console.log('je suis dans le guard et le token est valide');
        return true;
      }),

      catchError((error) => {
        console.error('Erreur lors de la validation du token:', error);
        this.router.navigate(['/login'], {
          queryParams: { message: 'Token validation failed' },
        });
        return of(false);
      })
    );
  }

  setUserFromToken(token: string): void {
    console.log('setUserFromToken is called');
    const decodedToken: any = jwtDecode(token);
    console.log('decodedToken:', decodedToken);
  }
  initializeUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setUserFromToken(token);
    }
  }
}
