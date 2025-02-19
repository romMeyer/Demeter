import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlanteDto } from '../../core/Dto/PlanteDto';
import { PlanteUserDto } from '../../core/Dto/PlanteUserDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-plante-liste',
  templateUrl: './plante-liste.component.html',
  styleUrls: ['./plante-liste.component.scss']
})
export class PlanteListeComponent {
  @Input() title: string = '';
  @Input() data!: PlanteDto[] | PlanteUserDto[];
  @Input() displayedColumns: string[] = [];
  @Input() columnsConfig: { key: string, label: string }[] = [];
  @Input() actionLabel: string = '';
  @Input() actionHandler: (item: PlanteDto | PlanteUserDto) => void = () => {};
  value: string = '';

  plantes = new MatTableDataSource<PlanteDto | PlanteUserDto>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.plantes.data = this.data;

    this.plantes.filterPredicate = (data: PlanteDto | PlanteUserDto, filter: string) => {
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
}
