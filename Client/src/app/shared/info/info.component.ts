import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  progress = 100;
  private intervalId: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<InfoComponent>
  ) {}

  ngOnInit() {
    console.log("data", this.data)
    const duration = this.data.duration || 3000
    const step = 100 / ((duration-400) / 100)

    this.intervalId = setInterval(() => {
      this.progress -= step;
      if (this.progress <= 0) {
        clearInterval(this.intervalId);
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // 👉 Méthode pour fermer le toast manuellement
  closeWindow() {
    this.snackBarRef.dismiss();
  }
}
