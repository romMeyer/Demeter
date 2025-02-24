import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanteDto } from '../../core/Dto/PlanteDto';
import { PlanteService } from '../../services/PlanteService';

@Component({
  selector: 'app-plante-information',
  templateUrl: './plante-information.component.html',
  styleUrl: './plante-information.component.scss'
})
export class PlantInformationComponent implements OnInit{
  plant!: PlanteDto;

  constructor(public dialogRef: MatDialogRef<PlantInformationComponent>, private plantService: PlanteService,
    @Inject(MAT_DIALOG_DATA) public data: { plantId: number }) {}

  ngOnInit(): void {
    this.fetchPlant;
    
  }

  fetchPlant(){
    this.plantService.getPlantById(this.data.plantId).subscribe({
      next:(response)=> {
        this.plant = response;
      },
      error:(error)=> {
        console.log("Erreur lors de la récupération de la plante :", error)
      }
    });
  }
}
