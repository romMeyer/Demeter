import { Component, ViewChild } from '@angular/core';
import { PlanteUserDto } from '../../../core/Dto/PlanteUserDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
 

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrl: './plantes.component.scss'
})
export class PlantesComponent {
  plantes!: MatTableDataSource<PlanteUserDto>;
  displayedColumns: string[] = ['image', 'libelle', 'arrosage' ,'arrose', 'actions'];
  value: string = '';


  constructor(private planteService: PlanteService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.planteService.getPlantes().subscribe(data => {
      // Appliquer la transformation aux dates
      const plantesFormatted = data.plantesUser.map((plante: PlanteUserDto) => ({
        ...plante,
        arrosage: formatDateToRelative(plante.arrosage),
        arrose: formatDateToRelative(plante.arrose)
      }));
  
      this.plantes = new MatTableDataSource(plantesFormatted);

      this.plantes.filterPredicate = (data: PlanteUserDto, filter: string) => {
        return data.libelle?.toLowerCase().includes(filter);
      };
    });
  }

  arroserPlante(plante: PlanteUserDto): void {
     console.log(`${plante.libelle} a été arrosée !`);
  }

  applyFilter(value: string): void {
    const filterValue = value;
    this.plantes.filter = filterValue;
  }

  ngAfterViewInit() {
    this.plantes.paginator = this.paginator;
    this.plantes.sort = this.sort;
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

  if (diffDays === 0){
    return `Aujourd'hui`;
  } else if (diffDays < 0){
    return `Il y a ${Math.abs(diffDays)} jour(s) : (${jourSemaine})`
  }

  return `Dans ${diffDays} jour(s) : (${jourSemaine})`;
}




