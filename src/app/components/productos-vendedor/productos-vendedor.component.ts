import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

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

}
