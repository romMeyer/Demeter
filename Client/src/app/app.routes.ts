import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PlantesComponent } from './pages/plantes/plantes/plantes.component';
import { CatalogueComponent } from './pages/plantes/catalogue/catalogue.component';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'plantes', component: PlantesComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: "404", component: NotFoundComponent},


    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: '404'},
];
    