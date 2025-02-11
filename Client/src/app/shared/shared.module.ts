import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { TitleComponent } from './title/title.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';
import { MatButtonModule } from '@angular/material/button';
import { InfoComponent } from './info/info.component';
import { MatIcon } from '@angular/material/icon';


@NgModule({
  declarations: [
    TitleComponent,
    DialogueComponent,
    InfoComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule ,
    MatIcon

  ],
  exports :[
    TitleComponent,
    DialogueComponent,
    InfoComponent
  ]
})
export class SharedModule { }
