import { Component, Inject, input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanteDto } from '../../../core/Dto/PlanteDto';
import { FamilleDto } from '../../../core/Dto/FamilleDto';
import { BesoinSoleil } from '../../../core/Dto/BesoinSoleilDto';
import { PlantType } from '../../../core/Dto/PlantType';

@Component({
  selector: 'app-plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})
export class PlantDialogComponent implements OnInit {
  private dialogData = Inject(MAT_DIALOG_DATA);
  plantForm: FormGroup;
  isSubmitted = false;

  mode: 'add' | 'edit' = 'add';
  title: string = "";

  plantTypes: PlantType[] = [];
  plantBesoinSoleil: BesoinSoleil[] = [];
  plantFamille: FamilleDto[] = [];


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

  constructor(
    public dialogRef: MatDialogRef<PlantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', 
        title: string,
        plantTypes: PlantType[],
        plantFamille: FamilleDto[],
        plantBesoinSoleil: BesoinSoleil[],
        plant: PlanteDto
      },
    private fb: FormBuilder
  ) {
    this.mode = data.mode || 'add';
    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      image: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      deb_recolte: [''],
      fin_recolte: [''],
      besoin_soleil: ['', Validators.required],
      freq_arrosage: ['', Validators.required],
      famille: ['', Validators.required]
    });

    this.plantTypes = this.data.plantTypes || [];
    this.plantBesoinSoleil = this.data.plantBesoinSoleil || [];
    this.plantFamille = this.data.plantFamille || [];
    this.title = this.data.title;
  }


  ngOnInit() {
    if (this.mode === 'edit' && this.data.plant) {
      this.patchForm(this.data.plant);
    }
  }

  patchForm(plant: PlanteDto) {
    this.plantForm.patchValue(plant);
  }

  get name() { return this.plantForm.get('name'); }
  get type() { return this.plantForm.get('type'); }
  get image() { return this.plantForm.get('image'); }
  get description() { return this.plantForm.get('description'); }
  get besoin_soleil() { return this.plantForm.get('besoin_soleil'); }
  get freq_arrosage() { return this.plantForm.get('freq_arrosage'); }
  get famille() { return this.plantForm.get('famille'); }

  onSubmitPlant() {
    this.isSubmitted = true;
    if (this.plantForm.valid) {
      const result = { ...this.plantForm.value, id: this.data.plant?.id, mode: this.mode };
      this.dialogRef.close(result); // Retourne les données + mode pour traitement parent
    }
  }
}
