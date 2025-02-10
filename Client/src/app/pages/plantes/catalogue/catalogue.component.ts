import { Component, ViewChild } from '@angular/core';
import { PlanteDto } from '../../../core/Dto/PlanteDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  plantes!: MatTableDataSource<PlanteDto>;
  displayedColumns: string[] = ['libelle', 'type', 'image'];
  value: string = '';


  constructor(private planteService: PlanteService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.planteService.getPlantes().subscribe(data => {
      this.plantes = new MatTableDataSource(data.plantes);

      this.plantes.filterPredicate = (data: PlanteDto, filter: string) => {
        return data.libelle?.toLowerCase().includes(filter);
      };
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
