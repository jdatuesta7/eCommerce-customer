import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var tns:any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  public slug = '';
  public producto : any = {};
  public url;

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
            console.log(this.producto);
          },
          error => {
            console.log(error);
          }
        )
        console.log(this.slug);
      }
    );
   }

  ngOnInit(): void {
    tns({
      container: '.cs-carousel-one',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      navContainer: "#cs-thumbnails",
      navAsThumbnails: true,
      gutter: 15,
    });
  }

}
