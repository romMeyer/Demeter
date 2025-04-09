import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanteDto } from '../../core/Dto/PlanteDto';

@Component({
  selector: 'app-plante-information',
  templateUrl: './plante-information.component.html',
  styleUrl: './plante-information.component.scss'
})
export class PlantInformationComponent implements OnInit{
  plant!: PlanteDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { plant: PlanteDto }) {}
  
  ngOnInit(): void {
    this.plant = this.data.plant;
  }
}
