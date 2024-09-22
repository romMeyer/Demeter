import { Component } from '@angular/core';

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrl: './plantes.component.scss'
})
export class PlantesComponent {
  //plantes: PlanteDto[] = [
  //  {1, "Tomate", "buisson","tomate"},
  //  {2, "Fraise", "buisson", "fraise"},
  //  {3, "Framboise", "buisson", "framboise"},
  //  {4, "Mirabelle", "arbre", "mirabelle"},
  //];
  plantes: PlanteDto

}

