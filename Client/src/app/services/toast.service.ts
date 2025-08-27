import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoComponent } from '../shared/info/info.component';

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
}