import { Component, ViewChild } from '@angular/core';
import { PlanteDto } from '../../../core/Dto/PlanteDto';
import { PlanteService } from '../../../services/PlanteService';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent {
  plantes!: MatTableDataSource<PlanteDto>;
  displayedColumns: string[] = ['libelle', 'type', 'image'];


  constructor(private planteService: PlanteService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.planteService.getPlantes().subscribe(data => {
      this.plantes = new MatTableDataSource(data.plantes);
    });
  }

  ngAfterViewInit() {
    this.plantes.paginator = this.paginator;
  }
}
