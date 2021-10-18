import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { DetalleProductoComponent } from "./components/detalle-producto/detalle-producto.component";

const appRoute: Routes = [
    {path: '', component: InicioComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'producto/detalles', component: DetalleProductoComponent}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);