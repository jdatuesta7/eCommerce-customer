import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var tns:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public nuevos_productos : Array<any> = [];
  public url;
  public productos_tendencia: Array<any> = [];

  constructor(
    private _clienteService: ClienteService
  ) {
    this.url = GLOBAL.url;
    this._clienteService.listar_productos_nuevos_publicos().subscribe(
      response => {
        this.nuevos_productos = response.data;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    this._clienteService.listar_productos_tendencia_publicos().subscribe(
      response => {
        this.productos_tendencia = response.data;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    setTimeout(()=>{

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 6,
            gutter: 30
          }
        }
        
        
      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer:'#custom-controls-trending',
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

    },500);
  }

}
