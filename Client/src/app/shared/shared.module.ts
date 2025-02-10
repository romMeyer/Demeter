import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { TitleComponent } from './title/title.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TitleComponent,
    DialogueComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule 

  ],
  exports :[
    TitleComponent,
    DialogueComponent
  ]
})
export class SharedModule { }
