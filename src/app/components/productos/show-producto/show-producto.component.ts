import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";

declare var tns: any;
declare var lightGallery: any;
declare var iziToast:any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  public slug = '';
  public producto: any = {};
  public url;
  public recomendados: Array<any> = [];
  public carrito : any = {
    cantidad : 1
  };
  public token : any;
  public btn_cart = false;
  public socket = io('http://localhost:4201');

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.slug = params['slug'];

        this._clienteService.obtener_producto_publico(this.slug).subscribe(
          response => {
            this.producto = response.data;
            this.producto.precio = new Intl.NumberFormat().format(this.producto.precio);

            this._clienteService.listar_productos_recomendados_publicos(this.producto.categoria).subscribe(
              response => {
                this.recomendados = response.data;
                this.recomendados.forEach((element, index) => {
                  this.recomendados[index].precio = new Intl.NumberFormat().format(this.recomendados[index].precio);
                });
              },
              error => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          }
        )
      }
    );

    
  }

  ngOnInit(): void {

    setTimeout(() => {

      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        items: 1,
        slideBy: 'page',
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
      });

      tns({
        container: '.cs-carousel-inner-two',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }
    }, 500);


  }

  agregar_producto(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      if (this.carrito.cantidad <= this.producto.stock) {
        let data = {
          producto: this.producto._id,
          cliente: localStorage.getItem('_id'),
          cantidad: this.carrito.cantidad
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

            this.socket.emit('add-carrito-add', {data: true});
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
      } else {
        iziToast.show({
          title: 'ERROR',
          color: 'red',
          position: 'topRight',
          message: 'La maxima cantidad disponible es: ' + this.producto.stock
        })
      }
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
