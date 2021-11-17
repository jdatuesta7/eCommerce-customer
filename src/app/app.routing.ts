import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { ProductosComponent } from "./components/productos/index-producto/productos.component";
import { DetalleProductoComponent } from "./components/detalle-producto/detalle-producto.component";
import { VendedoresComponent } from "./components/vendedores/vendedores.component";
import { ProductosVendedorComponent } from "./components/productos-vendedor/productos-vendedor.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";

import { AuthGuard } from "./guards/auth.guard";
import { RegistrarUsuarioComponent } from "./components/usuario/registrar/registrar-usuario.component";

const appRoute: Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'productos/categoria/:categoria', component: ProductosComponent},
    {path: 'producto/detalles', component: DetalleProductoComponent},
    {path: 'vendedores', component: VendedoresComponent},
    {path: 'nombre-de-local/productos', component: ProductosVendedorComponent},

    {path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard]},
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);