import { Component, ViewChild } from '@angular/core';
import { PlanteDto } from '../../core/Dto/PlanteDto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrl: './plants-list.component.scss'
})

export class PlantsListComponent {
  displayName: string[] = ["libelle", "type", "description"];
  dataSource = new MatTableDataSource<PlanteDto> ([
    {id:1, libelle:"Tomate", type:"buisson", description:"La description de l'objet"},
    {id:2, libelle:"Fraise", type:"buisson", description:"La description de l'objet"},
    {id:3, libelle:"Framboise", type:"buisson", description:"La description de l'objet"},
    {id:4, libelle:"Mirabelle", type:"arbre", description:"La description de l'objet"},
    {id:5, libelle:'Rose', type:'Fleur', description:"La description de l'objet"},
    {id:6, libelle:'Tulipe', type:'Fleur', description:"La description de l'objet"},
  ]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
