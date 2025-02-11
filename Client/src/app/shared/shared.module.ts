import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { TitleComponent } from './title/title.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';
import { MatButtonModule } from '@angular/material/button';
import { InfoComponent } from './info/info.component';
import { MatIconModule } from '@angular/material/icon';
import { PlanteListeComponent } from './plante-liste/plante-liste.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TitleComponent,
    DialogueComponent,
    InfoComponent,
    PlanteListeComponent

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule ,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatInputModule,

  ],
  exports :[
    TitleComponent,
    DialogueComponent,
    InfoComponent,
    PlanteListeComponent
  ]
})
export class SharedModule { }
