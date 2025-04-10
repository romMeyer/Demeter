import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlanteCatalogueDto, PlanteDto } from '../../core/Dto/PlanteDto';
import { PlanteUserDto } from '../../core/Dto/PlanteUserDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PlantInformationComponent } from '../plante-information/plante-information.component';
import { PlanteService } from '../../services/PlanteService';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-plante-liste',
  templateUrl: './plante-liste.component.html',
  styleUrls: ['./plante-liste.component.scss']
})
export class PlanteListeComponent {
  @Input() title: string = '';
  @Input() data!: PlanteCatalogueDto[] | PlanteUserDto[];
  @Input() displayedColumns: string[] = [];
  @Input() columnsConfig: { key: string, label: string }[] = [];
  @Input() actionLabel: string = '';
  @Input() actionHandler: (item: PlanteCatalogueDto | PlanteUserDto) => void = () => {};
  @Input() deleteActionHandler: (item: PlanteCatalogueDto | PlanteUserDto) => void = () => {};
  @Input() showRevokePlant : boolean = false;
  value: string = '';
  showDeleteButton: boolean = false;
  plantDetailsSubject: Subject<PlanteDto> = new Subject<PlanteDto>();
  plantDetails$ = this.plantDetailsSubject.asObservable();

  plantes = new MatTableDataSource<PlanteCatalogueDto | PlanteUserDto>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, public plantService: PlanteService){}

  ngOnChanges() {
    this.plantes.data = this.data;

    this.plantes.filterPredicate = (data: PlanteCatalogueDto | PlanteUserDto, filter: string) => {
      const name = 'name' in data ? data.name : data.plant?.name;
      return name?.toLowerCase().includes(filter);
    };
  }

  applyFilter(name: string): void{
    const filterValue = name;
    this.plantes.filter = filterValue;
  }

  ngAfterViewInit() {
    this.plantes.paginator = this.paginator;
    this.plantes.sort = this.sort;
  }

  toggleDeleteButton(){
    this.showDeleteButton = !this.showDeleteButton;
  }

  showPlantInfo(data: PlanteCatalogueDto | PlanteUserDto){
    let isPlant = (data as PlanteUserDto).plant == null;
    let plantId = isPlant ? (data as PlanteCatalogueDto).id : (data as PlanteUserDto).plant.id
    this.plantService.getPlantById(plantId).subscribe({
      next: (data) =>{ 
        const dialogRef = this.dialog.open(PlantInformationComponent, {
          data: {plant: data },
        });
      }
    })
    
    
      
  }
}
