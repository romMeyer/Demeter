import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({  
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  progress = 100;
  interval: any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {content:string, accentuateWord:string},
  private info: MatSnackBarRef<InfoComponent>) {}

  closeWindow(){
    this.info.dismiss();
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    const step = 100 / (2900 / 100)
    this.interval = setInterval(() => {
      this.progress -= step;
      if (this.progress <= 0) {
        clearInterval(this.interval);
      }
    }, 100);
  }
  
}
