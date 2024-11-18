import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantesComponent } from './plantes/plantes.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PlantesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    
]
})
export class PlantesModule { }
