import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Role } from '../../core/enum/Role';
import { PlantUserService } from '../../services/PlantUserService';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  Role = Role;
  plantNeedWatering$ = this.plantUserService.plantNeedWatering$;

  currentUser$ = this.authService.observable$;
  

  constructor(private authService: AuthService, private plantUserService: PlantUserService, private cdRef: ChangeDetectorRef){
  }


  logout(): void {
    this.authService.logout();
  }
}


