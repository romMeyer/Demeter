import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Subscription } from 'rxjs';
import { Role } from '../../core/enum/Role';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{
  isLoggedIn: boolean = false;
  Role = Role;

  currentUser$ = this.authService.observable$;
  

  constructor(private authService: AuthService, private cdRef: ChangeDetectorRef){
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }



  logout(): void {
    this.authService.logout();
  }
}


