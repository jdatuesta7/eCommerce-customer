import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { routing } from "./app.routing";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductosComponent } from './components/productos/index-producto/productos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { VendedoresComponent } from './components/vendedores/vendedores.component';
import { ProductosVendedorComponent } from './components/productos-vendedor/productos-vendedor.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar/registrar-usuario.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    ProductosComponent,
    ContactoComponent,
    DetalleProductoComponent,
    VendedoresComponent,
    ProductosVendedorComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    RegistrarUsuarioComponent,
    ShowProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
