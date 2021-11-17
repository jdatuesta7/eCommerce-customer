import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public token;
  public id;
  public usuario : any = undefined;
  public usuario_datos : any = {};
  public categorias_global : any = {};

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if(this.token && this.id){

      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response => {
          this.usuario = response.data;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
  
          if(localStorage.getItem('usuario')){
            this.usuario_datos = JSON.parse(localStorage.getItem('usuario')!);
          }else{
            this.usuario_datos = undefined;
          }
        },
        error => {
          console.log(error.message);
          this.usuario_datos = undefined;
        }
      );

    }else{
      this.usuario_datos = undefined;
    }

    this._clienteService.obtener_categorias_publico().subscribe(
      response => {
        console.log(response);
        this.categorias_global = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
