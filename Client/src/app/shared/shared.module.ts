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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PlantInformationComponent } from './plante-information/plante-information.component';
import { InfoErrorComponent } from './info-error/info-error.component';


@NgModule({
  declarations: [
    TitleComponent,
    DialogueComponent,
    InfoComponent,
    InfoErrorComponent,
    PlanteListeComponent,
    SidenavComponent,
    PlantInformationComponent

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
    MatProgressBarModule,
    RouterModule,
    HttpClientModule
    

  ],
  exports :[
    TitleComponent,
    DialogueComponent,
    InfoComponent,
    InfoErrorComponent,
    PlanteListeComponent,
    SidenavComponent,
    PlantInformationComponent
  ]
})
export class SharedModule { }
