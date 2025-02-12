import { Component, ViewChild } from '@angular/core';
import { PlanteUserDto } from '../../../core/Dto/PlanteUserDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from '../../../shared/dialogue/dialogue.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../../../shared/info/info.component';
 

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrl: './plantes.component.scss'
})
export class PlantesComponent {
  plantes = new MatTableDataSource<PlanteUserDto>([]);
  displayedColumns: string[] = ['image', 'libelle', 'arrosage' ,'arrose', 'actions'];
  columnsConfig: {key: string, label: string}[] = [
    { key: 'libelle', label: 'Libellé' },
    { key: 'image', label: 'Image' },
    { key: 'arrosage', label: 'Arrosé le' },
    { key: 'arrose', label: 'A arrosé' }
]
  value: string = '';


  constructor(private planteService: PlanteService, public dialogue: MatDialog, private info: MatSnackBar){}

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
  
      this.plantes.data = plantesFormatted;

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

  arroserDialogue(plante: PlanteUserDto): void {
    const dialogRef = this.dialogue.open(DialogueComponent, {
      width: '300px',
      data: {title:"Confirmer l'arrosage", question:"Voulez-vous arroser ", libellePlante: plante.libelle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.info.openFromComponent(InfoComponent, {
          duration: 3000, // Temps d'affichage
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['custom-snackbar'], // Style personnalisé
          data: { accentuateWord: `${plante.libelle}`, content: 'a été arrosé !' }
        });
      }
    });
  }

  actionHandler = (plante: any) => this.arroserDialogue(plante);

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




