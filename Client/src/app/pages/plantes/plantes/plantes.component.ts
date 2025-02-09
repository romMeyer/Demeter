import { Component, ViewChild } from '@angular/core';
import { PlanteUserDto } from '../../../core/Dto/PlanteUserDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrl: './plantes.component.scss'
})
export class PlantesComponent {
  plantes!: MatTableDataSource<PlanteUserDto>;
  displayedColumns: string[] = ['libelle', 'image', 'arrosage' ,'arrose', 'actions'];


  constructor(private planteService: PlanteService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.planteService.getPlantes().subscribe(data => {
      // Appliquer la transformation aux dates
      const plantesFormatted = data.plantesUser.map((plante: PlanteUserDto) => ({
        ...plante,
        arrosage: formatDateToRelative(plante.arrosage),
        arrose: formatDateToRelative(plante.arrose)
      }));
  
      this.plantes = new MatTableDataSource(plantesFormatted);
    });
  }

  ngAfterViewInit() {
    this.plantes.paginator = this.paginator;
  }

  arroserPlante(plante: PlanteUserDto): void {
     console.log(`${plante.libelle} a été arrosée !`);
  }

}

function formatDateToRelative(dateString: Date): string {
  const date = new Date(dateString);
  const today = new Date();

  // Calcul du nombre de jours entre aujourd'hui et la date
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertit en jours

  // Jours de la semaine en français
  const joursSemaine = ["Dimanche","Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const jourSemaine = joursSemaine[date.getDay()];

  if(diffDays === 0){
    return `Aujourd'hui`;
  }

  return `Dans ${diffDays} jour(s) : (${jourSemaine})`;
}




