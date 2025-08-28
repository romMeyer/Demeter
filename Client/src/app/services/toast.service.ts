import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../shared/info/info.component';
import { InfoErrorComponent } from '../shared/info-error/info-error.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  show(accentuateWord: string, content: string, duration: number = 3000) {
    this.snackBar.openFromComponent(InfoComponent, {
      data: { accentuateWord, content },
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  error(content: string, duration: number = 5000) {
    this.snackBar.openFromComponent(InfoErrorComponent, {
      data: { content },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }
}