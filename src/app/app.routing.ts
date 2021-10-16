import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { ProductosComponent } from "./components/productos/productos.component";

const appRoute: Routes = [
    {path: '', component: InicioComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'productos', component: ProductosComponent}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);