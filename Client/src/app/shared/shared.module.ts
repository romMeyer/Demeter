import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table';
import { PlantsListComponent } from './plants-list/plants-list.component';


@NgModule({
  declarations: [
    PlantsListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class SharedModule { }
