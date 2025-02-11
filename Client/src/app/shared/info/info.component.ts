import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({  
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {content:string, accentuateWord:string},
  private info: MatSnackBarRef<InfoComponent>) {}

  closeWindow(){
    this.info.dismiss();  
  }
  
}
