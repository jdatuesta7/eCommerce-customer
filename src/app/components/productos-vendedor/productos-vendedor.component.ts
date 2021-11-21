import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast:any;

@Component({
  selector: 'app-productos-vendedor',
  templateUrl: './productos-vendedor.component.html',
  styleUrls: ['./productos-vendedor.component.css']
})
export class ProductosVendedorComponent implements OnInit {

  public vendedor : any = {};
  public productos_vendedor: Array<any> = [];
  public local = '';
  public url;
  public carrito : any = {
    cantidad : 1
  };
  public token : any;
  public btn_cart = false;

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerVendedor();
  }

  obtenerProductos() {
    this._route.params.subscribe(
      params => {
        this.local = params['local'];
        this._clienteService.listar_productos_vendedor_publicos(this.local).subscribe(
          response => {
            console.log(response.data);
            this.productos_vendedor = response.data;

          },
          error => {
            console.log(error);
          }
        );
      }
    );
  }

  obtenerVendedor() {
    this._route.params.subscribe(
      params => {
        this.local = params['local'];
        this._clienteService.obtener_vendedor_publico(this.local).subscribe(
          response => {
            console.log(response);
            this.vendedor = response.data;
          },
          error => {
            console.log(error);
          }
        )
      }
    );
  }

  reset_productos() {
    this._router.navigate(['/productos']);
  }

  agregar_producto(id:any){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      
      let data = {
        producto: id,
        cliente: localStorage.getItem('_id'),
        cantidad: 1
      }
      
      this.btn_cart = true;
      this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            titleColor: '#000000',
            message: 'Se ha agregado el producto al carrito'
          });

          this.btn_cart = false;
        },
        error => {
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: error.error.message
          });

          this.btn_cart = false;
        }
      );
      
    }else{
      this._router.navigate(['/login']);

      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe iniciar sesion para poder añadir al carrito'
      });
    }
    
  }

}
