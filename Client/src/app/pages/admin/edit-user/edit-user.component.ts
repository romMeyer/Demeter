import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../../core/Dto/UserDto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  form: FormGroup;
  roles = ["ROLE_ADMIN", "ROLE_USER"];
  
constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id:        [data.id],
      firstName: [data.firstName, Validators.required],
      lastName:  [data.lastName, Validators.required],
      username:  [data.username, [Validators.required, Validators.email]],
      role:      [data.role, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
