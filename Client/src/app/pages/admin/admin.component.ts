import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../core/enum/Role';
import { UserDto } from '../../core/Dto/UserDto';

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
  users: UserDto[] = [
    {firstname: "Romain", lastname: "Meyer", name: "admin@gmail.com", role: Role.ADMIN},
    {firstname: "Clara", lastname: "Petit", name: "clara.petit@gmail.com", role: Role.GUEST}
  ];

  plantTypes = [
     {id: 1, libelle: "Fruit"},
     {id: 2, libelle: "Légume"}
  ]

  plantMois = [
     {id: 1, libelle: "Janvier"},
     {id: 2, libelle: "Février"},
     {id: 3, libelle: "Mars"},
     {id: 4, libelle: "Avril"},
     {id: 5, libelle: "Mai"},
     {id: 6, libelle: "Juin"},
     {id: 7, libelle: "Juillet"},
     {id: 8, libelle: "Août"},
     {id: 9, libelle: "Septembre"},
     {id: 10, libelle: "Octobre"},
     {id: 11, libelle: "Novembre"},
     {id: 12, libelle: "Décembre"}
  ]

  plantBesoinSoleil = [
     {id: 1, libelle: "Pas beaucoup"},
     {id: 2, libelle: "Moyen"},
     {id: 3, libelle: "Beaucoup"}
  ]

  plantFamille = [
     {id: 1, libelle: "Crétacé"}
  ]

  constructor(private fb: FormBuilder, private authService: AuthService) {

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

  get name() {
    return this.plantForm.get("name");
  }

  get type() {
    return this.plantForm.get("type");
  }

  get image() {
    return this.plantForm.get("image");
  }

  get description() {
    return this.plantForm.get("description");
  }

  get deb_recolte() {
    return this.plantForm.get("deb_recolte");
  }

  get fin_recolte() {
    return this.plantForm.get("fin_recolte");
  }

  get besoin_soleil() {
    return this.plantForm.get("besoin_soleil");
  }

  get freq_arrosage() {
    return this.plantForm.get("freq_arrosage");
  }

  get famille() {
    return this.plantForm.get("famille");
  }

  
  onSubmitPlant() {
    this.isSubmitted = true;
    if (this.plantForm.invalid) {
      return;
    }
    this.authService.login(this.plantForm.value);
    console.log("Ajout de la plante")
  }

  openEditDialog(user: any){
    console.log(user)
  }

  openSupDialog(user: any){
    console.log(user)
  }
}
