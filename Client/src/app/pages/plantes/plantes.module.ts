import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PlantesComponent } from './plantes/plantes.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PlanteService } from '../../services/PlanteService';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { PlanteListeComponent } from '../../shared/plante-liste/plante-liste.component';
import { PlantUserService } from '../../services/PlantUserService';

@NgModule({
  declarations: [
    PlantesComponent,
    CatalogueComponent,
    
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSortModule,

],
  providers: [
    PlanteService,
    PlantUserService
  ]
})
export class PlantesModule { }
