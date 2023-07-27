import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admininicio',
  templateUrl: './admininicio.component.html',
  styleUrls: ['./admininicio.component.css']
})
export class AdmininicioComponent {
  userLoged: boolean = false;
  constructor(private router: Router) { }

  logout() {
 
    localStorage.removeItem('emailUserLoged');
    localStorage.removeItem('username');
    localStorage.removeItem('emailUserLogedAd');
    this.userLoged=false;
    this.router.navigate(['/']);
  }
}
