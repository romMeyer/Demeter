import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../core/enum/Role';
import { UserDto } from '../../core/Dto/UserDto';
import { AdminService } from '../../services/admin.service';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ToastService } from '../../services/toast.service';
import { DialogueComponent } from '../../shared/dialogue/dialogue.component';
import { FamilleService } from '../../services/famille.service';
import { FamilleDto } from '../../core/Dto/FamilleDto';
import { PlantDialogComponent } from './plant-dialog/plant-dialog.component';
import { PlanteDto } from '../../core/Dto/PlanteDto';
import { PlanteService } from '../../services/plante.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  plantForm: FormGroup;
  isSubmitted = false;
  displayedColumns: string[] = ['Role', 'Name', 'FirstName', 'LastName', "Action"];
  Role = Role;

  // edit user
  dialog = inject(MatDialog);
  selectedUser: any = null;

  // fetch users
  dataSource = new MatTableDataSource<UserDto>();

  // fetch familles
  plantFamille: FamilleDto[] = [];
  

  plantTypes = [
     {id: 1, name: "Fruit"},
     {id: 2, name: "Légume"}
  ]

  plantBesoinSoleil = [
     {id: 1, name: "Peu"},
     {id: 2, name: "Moyen"},
     {id: 3, name: "Beaucoup"}
  ]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private toastService:  ToastService,
    private familleService: FamilleService,
    private planteService: PlanteService
  ) {

    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      deb_recolte: ['', []],
      fin_recolte: ['', []],
      besoin_soleil: ['', [Validators.required]],
      freq_arrosage: ['', [Validators.required]],
      famille: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchUsers();
    this.fetchFamille();
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  fetchFamille() {
    this.familleService.getFamilles().subscribe({
      next: (res) => this.plantFamille = res,
      error: (e) => console.log(e)
    })
  }

  openEditDialog(user: UserDto){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '300px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.setUser(result).subscribe({
          next: () => {
            this.toastService.show(result.name, " mis à jour.")
            this.fetchUsers();
          },
          error: () => console.log("Erreur lors de l'édition.")
        });
      }
    });

  }

  openSupDialog(user: UserDto){
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '300px',
      data: {title:"Confirmer la supprésion", question:"Voulez-vous supprimer ", libellePlante: user.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.deleteUser(user).subscribe({
          next: () =>{
            this.toastService.show(user.username, " supprimé.")
            this.fetchUsers();
          },
          error: ()=> console.log("Erreur lors de la suppression.")

        })
      }
    })
      
  }

  openPlantDialog() {
    const dialogRef = this.dialog.open(PlantDialogComponent, {
      width: '600px',
      data: { 
        mode: 'add' as const, 
        title: "Insérer une plante",
        plantTypes: this.plantTypes,
        plantFamille: this.plantFamille,
        plantBesoinSoleil: this.plantBesoinSoleil
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (data: PlanteDto) => {
        this.planteService.createPlante(data).subscribe();
      }
    });
  }

}
