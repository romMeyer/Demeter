import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { TitleComponent } from './title/title.component';


@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports :[
    TitleComponent
  ]
})
export class SharedModule { }
