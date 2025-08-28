import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-error',
  templateUrl: './info-error.component.html',
  styleUrls: ['./info-error.component.scss']
})
export class InfoErrorComponent implements OnInit, OnDestroy {
  progress = 100;
  private intervalId: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<InfoErrorComponent>
  ) {}

  ngOnInit() {
    console.log("data", this.data)
    const duration = this.data.duration || 5000
    const step = 100 / ((duration-600) / 100)

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

  closeWindow() {
    this.snackBarRef.dismiss();
  }
}
