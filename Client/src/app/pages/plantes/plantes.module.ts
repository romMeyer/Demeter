import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PlantesComponent } from './plantes/plantes.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PlantesAddComponent } from './plantes-add/plantes-add.component';
import { PlanteService } from '../../services/PlanteService';



@NgModule({
  declarations: [
    PlantesComponent,
    CatalogueComponent,
    PlantesAddComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [
    PlanteService
  ]
})
export class PlantesModule { }
