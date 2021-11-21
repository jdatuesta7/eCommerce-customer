import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from "./components/inicio/inicio.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { ProductosComponent } from "./components/productos/index-producto/productos.component";
import { VendedoresComponent } from "./components/vendedores/vendedores.component";
import { ProductosVendedorComponent } from "./components/productos-vendedor/productos-vendedor.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";

import { AuthGuard } from "./guards/auth.guard";
import { RegistrarUsuarioComponent } from "./components/usuario/registrar/registrar-usuario.component";
import { ShowProductoComponent } from "./components/productos/show-producto/show-producto.component";

const appRoute: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registrar-usuario', component: RegistrarUsuarioComponent},

    {path: '', component: InicioComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'productos/categoria/:categoria', component: ProductosComponent},
    {path: 'productos/:slug', component: ShowProductoComponent},

    {path: 'locales-comerciales', component: VendedoresComponent},
    {path: 'local-comercial/productos/:local', component: ProductosVendedorComponent},
    
    {path: 'contacto', component: ContactoComponent},

    {path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard]},
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);