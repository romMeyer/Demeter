import { Component, ViewChild } from '@angular/core';
import { PlanteUserDto } from '../../../core/Dto/PlanteUserDto';
import { PlanteService } from '../../../services/plante.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from '../../../shared/dialogue/dialogue.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../../../shared/info/info.component';
import { Router } from '@angular/router';
import { PlantUserService } from '../../../services/plantUser.service';
import { ToastService } from '../../../services/toast.service';
 

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrl: './plantes.component.scss'
})
export class PlantesComponent {
  plantes = new MatTableDataSource<PlanteUserDto>([]);
  displayedColumns: string[] = ['imageName', 'name', 'arrose' ,'arrosage', 'actions'];
  columnsConfig: {key: string, label: string}[] = [
    { key: 'name', label: 'Libellé' },
    { key: 'imageName', label: 'Image' },
    { key: 'arrose', label: 'Arrosé le' },
    { key: 'arrosage', label: 'A arrosé' }
]
  value: string = '';


  constructor(private planteService: PlanteService, 
    private plantUserService: PlantUserService, 
    public dialogue: MatDialog, 
    private info: MatSnackBar, 
    private router: Router,
    private toastService: ToastService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchPlants();
    this.plantUserService.getNumberPlantUserNeedWatering();
  }

  fetchPlants(): void{
    this.planteService.getUserPlants().subscribe({
      next: (data) => {
        // Appliquer la transformation aux dates
        const plantesFormatted = data.map((plante: PlanteUserDto) => ({
          ...plante,
          name: plante.plant.name,
          imageName: plante.plant.imageName,
          arrosage: formatDateToRelative(plante.arrosage),
          arrose: formatDateToRelative(plante.arrose)
        }));
    
        this.plantes.data = plantesFormatted;
    
        this.plantes.filterPredicate = (data: PlanteUserDto, filter: string) => {
          return data.plant.name?.toLowerCase().includes(filter);
        };
      },
      error: (error) => {
        if (error.status === 403) {
          console.warn("🚨 Accès interdit (403), redirection vers /login...");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  arroserPlante(plantUser: PlanteUserDto): void {
    this.plantUserService.waterPlantUser(plantUser.plant.id).subscribe({
      next: () =>{
        this.toastService.show(plantUser.plant.name, 'a été arrosé(e) !')
        this.plantUserService.getNumberPlantUserNeedWatering();
        this.fetchPlants();
      },
      error: (error) =>{
        console.error("Arrosage raté : ", error)
      }
    })
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
      data: {title:"Confirmer l'arrosage", question:"Voulez-vous arroser ", libellePlante: plante.plant.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.arroserPlante(plante);
      }
    });
  }

  actionHandler = (plante: any) => this.arroserDialogue(plante);

  deleteDialog(plantUser: PlanteUserDto): void {
    const dialogRef = this.dialogue.open(DialogueComponent, {
      width: '300px',
      data: {title:"Confirmer la suppréssion", question:"Voulez-vous supprimer ", libellePlante: plantUser.plant.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePlantUser(plantUser);
      }
    });
  }

  deletePlantUser(plantUser: PlanteUserDto): void {
    this.plantUserService.deletePlantUser(plantUser.plant.id).subscribe({
      next: (response) =>{
        this.toastService.show(plantUser.plant.name, 'a été supprimé(e) !')
        this.fetchPlants();
      },
      error: (error) =>{
        console.error("Suppréssion raté : ", error)
      }
    });
  }

  deleteActionHandler = (plant: any) => this.deleteDialog(plant);


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




