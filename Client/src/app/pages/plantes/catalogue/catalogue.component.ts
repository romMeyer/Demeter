import { Component, ViewChild } from '@angular/core';
import { PlanteCatalogueDto } from '../../../core/Dto/PlanteDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogueComponent } from '../../../shared/dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../../../shared/info/info.component';
import { PlantUserService } from '../../../services/PlantUserService';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss',
  providers: [
    /*{
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }*/
  ],
})
export class CatalogueComponent {
  plantes = new MatTableDataSource<PlanteCatalogueDto>([]);  
  displayedColumns: string[] = ['name', 'imageName', 'plantType', 'actions'];
  columnsConfig: {key: string, label: string}[] = [
    { key: 'name', label: 'Libellé' },
    { key: 'imageName', label: 'Image' },
    { key: 'plantType', label: 'Type' }
  ]
  value: string = '';


  constructor(private planteService: PlanteService, private plantUserService: PlantUserService, private dialogue: MatDialog, private info: MatSnackBar){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.planteService.getPlants().subscribe(data => {
      this.plantes.data = data;

      this.plantes.filterPredicate = (data: PlanteCatalogueDto, filter: string) => {
        return data.name?.toLowerCase().includes(filter);
      };

      if (this.paginator){
        this.plantes.paginator = this.paginator;
      }
    });

  }

  ajouterPlante(plante: PlanteCatalogueDto){
    this.plantUserService.addPlantUser(plante.id).subscribe({
      next: (response) =>{
        this.showInfo(plante)
      },
      error: (error) =>{
        console.error("Ajout raté")
      }
    });
  }

  showInfo(plante: PlanteCatalogueDto){
    this.info.openFromComponent(InfoComponent, {
      duration: 3000, // Temps d'affichage
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: { accentuateWord: `${plante.name}`, content: 'a été ajouté !' }
    });
  }

  ajouterDialogue(plante: PlanteCatalogueDto): void {
      const dialogRef = this.dialogue.open(DialogueComponent, {
        width: '300px',
        data: {title:"Confirmer l'ajout", question:"Voulez-vous ajouter ", libellePlante: plante.name }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ajouterPlante(plante);
        }
      });
    }

  applyFilter(value: string): void {
    const filterValue = value;
    this.plantes.filter = filterValue;
  }

  ngAfterViewInit() {
    this.plantes.paginator = this.paginator;
    this.plantes.sort = this.sort;
  }

  actionHandler = (plante: any) => this.ajouterDialogue(plante);
}
