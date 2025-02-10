import { Component, ViewChild } from '@angular/core';
import { PlanteDto } from '../../../core/Dto/PlanteDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogueComponent } from '../../../shared/dialogue/dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  plantes = new MatTableDataSource<PlanteDto>([]);  
  displayedColumns: string[] = ['libelle', 'image', 'type', 'actions'];
  value: string = '';


  constructor(private planteService: PlanteService, public dialogue: MatDialog){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.planteService.getPlantes().subscribe(data => {
      this.plantes.data = data.plantes;

      this.plantes.filterPredicate = (data: PlanteDto, filter: string) => {
        return data.libelle?.toLowerCase().includes(filter);
      };

      if (this.paginator){
        this.plantes.paginator = this.paginator;
      }
    });

  }

  ajouterPlante(plante: PlanteDto){
    console.log(plante);
  }

  ajouterDialogue(plante: PlanteDto): void {
      const dialogRef = this.dialogue.open(DialogueComponent, {
        width: '300px',
        data: {title:"Confirmer l'ajout", question:"Voulez-vous ajouter ", libellePlante: plante.libelle }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(`${plante.libelle} a été ajouté !`);
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
}
