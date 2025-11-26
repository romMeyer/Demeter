import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EditUserComponent } from "./admin/edit-user/edit-user.component";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AdminComponent,
    EditUserComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle

],
  providers: [
    AdminComponent,
    EditUserComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class PagesModule { }
