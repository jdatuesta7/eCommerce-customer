import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";

declare  var iziToast:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public idCliente;
  public token;
  public carrito_arr: Array<any> = [];
  public subtotal = 0;
  public subtotalFormated = '';
  public url;
  public total = 0;
  public totalFormated = '';
  public socket = io('http://localhost:4201');

  constructor(
    private _clienteService: ClienteService
  ) { 
    this.url = GLOBAL.url;
    this.idCliente = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.obtener_carrito();

   }

  ngOnInit(): void {
  }

  obtener_carrito(){
    this._clienteService.obtener_carrito_cliente(this.idCliente, this.token).subscribe(
      response => {
        this.carrito_arr = response.data;
        this.carrito_arr.forEach((element, index) => {
          this.subtotal = this.subtotal + parseInt(element.producto.precio);
          this.carrito_arr[index].producto.precio = new Intl.NumberFormat().format(element.producto.precio);
        });

        this.subtotalFormated = new Intl.NumberFormat().format(this.subtotal);
        this.total = this.subtotal + 9000;
        this.totalFormated = new Intl.NumberFormat().format(this.total);
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminar_item(id:any){
    this._clienteService.eliminar_carrito_cliente(id, this.token).subscribe(
      response => {
        this.socket.emit('delete-carrito', {data: response.data});
        console.log(response);
        iziToast.show({
          title: 'OK',
          color: 'green',
          position: 'topRight',
          titleColor: '#000000',
          message: 'Se ha eliminado el producto del carrito'
        });

        this.obtener_carrito();
      },
      error => {
        console.log(error);
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: error.error.message
        });
      }
    );
  }

}
