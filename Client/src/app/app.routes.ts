import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PlantesComponent } from './pages/plantes/plantes/plantes.component';
import { CatalogueComponent } from './pages/plantes/catalogue/catalogue.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { roleGuard } from './core/guard/role.guard';
import { Role } from './core/enum/Role';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'plantes', component: PlantesComponent, canActivate:[roleGuard], data: { roles: [Role.USER, Role.ADMIN] }},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'admin', component: AdminComponent, canActivate:[roleGuard], data: { roles: [Role.ADMIN] }},
    {path: "404", component: NotFoundComponent},


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: '404'},
];
    