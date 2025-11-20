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
  //moisList = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  moisList = ["Jan", "Fev", "Mars", "Avr", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"]

  constructor(@Inject(MAT_DIALOG_DATA) public data: { plant: PlanteDto }) {}
  
  ngOnInit(): void {
    this.plant = this.data.plant;
  }
  

  isMonthInHarvest(month: number): boolean {
    const debut = parseInt(this.plant?.debutRecolte || '0');
    const fin = parseInt(this.plant?.finRecolte || '0');
    if (isNaN(debut) || isNaN(fin)) return false;
  
    return debut <= fin
      ? month >= debut && month <= fin
      : month >= debut || month <= fin;
  }
  
  isInSeason(): boolean {
    const currentMonth = new Date().getMonth() + 1;
    return this.isMonthInHarvest(currentMonth);
  }
}
