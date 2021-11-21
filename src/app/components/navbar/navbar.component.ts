import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var $:any;
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
  public op_cart = false;
  public carrito_arr : Array<any> = [];
  public url;
  public subtotal = 0;
  public subtotalFormated = '';

  constructor(
    private _clienteService: ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;

    if(this.token && this.id){

      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response => {
          this.usuario = response.data;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
  
          if(localStorage.getItem('usuario')){
            this.usuario_datos = JSON.parse(localStorage.getItem('usuario')!);

            this._clienteService.obtener_carrito_cliente(this.usuario_datos._id, this.token).subscribe(
              response => {
                this.carrito_arr = response.data;
                this.carrito_arr.forEach((element, index) => {
                  this.subtotal = this.subtotal + parseInt(element.producto.precio);
                  this.carrito_arr[index].producto.precio = new Intl.NumberFormat().format(element.producto.precio);
                });

                this.subtotalFormated = new Intl.NumberFormat().format(this.subtotal);

              },
              error => {
                console.log(error);
              }
            );
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

  op_modalcart(){
    if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
    } else {
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

}
