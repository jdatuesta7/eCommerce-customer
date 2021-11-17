import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var noUiSlider: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public categorias_global: any = {};
  public filtro_categorias = '';
  public productos : Array<any> = [];
  public filtro_producto = '';
  public load_data = true;
  public url;
  public filtro_cat_productos = 'todos';
  public route_categoria : any;

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
    this.obtenerCategorias();

    this._route.params.subscribe(
      params => {
        this.route_categoria = params['categoria'];
        console.log(this.route_categoria);

        if(this.route_categoria){
          this.load_data = true;
          this._clienteService.listar_productos_publicos(this.filtro_producto).subscribe(
            response => {
              this.productos = response.data;

              this.productos.forEach((element, index) => {
                this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
              });
    
              this.productos = this.productos.filter((item:any)=> item.categoria.toLowerCase() == this.route_categoria);

              this.load_data = false;
            },
            error => {
              console.log(error);
            }
          )
        }else{
          this.obtenerProductos('');
        }
      }
    )

  }

  obtenerCategorias(){
    this._clienteService.obtener_categorias_publico().subscribe(
      response => {
        this.categorias_global = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerProductos(filtro:any){
    this._clienteService.listar_productos_publicos(filtro).subscribe(
      response => {
        this.productos = response.data;
        console.log(this.productos);
        this.productos.forEach((element, index) => {
          this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
        });

        this.load_data = false;
      },
      error => {
        console.log(error);
        this.load_data = false;
      }
    )
  }

  ngOnInit(): void {
    var slider: any = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [0, 10000000],
      connect: true,
      range: {
        'min': 0,
        'max': 10000000
      },
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 5,

      }
    })

    slider.noUiSlider.on('update', function (values: any) {
      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size', '11px');
  }

  buscar_categorias() {
    if (this.filtro_categorias) {
      let search = new RegExp(this.filtro_categorias, 'i');

      this.categorias_global.categorias = this.categorias_global.categorias.filter(
        (item: any) => search.test(item.titulo)
      );

    }else{
      this.obtenerCategorias();
    }
  }

  buscar_productos(){
    this.obtenerProductos(this.filtro_producto);
  }

  buscar_precios(){

    this.load_data = true;
    this._clienteService.listar_productos_publicos('').subscribe(
      response => {
        this.productos = response.data;

        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());

        // console.log(minimo, maximo);

        this.productos = this.productos.filter(
          (item:any) => {
            return item.precio >= min && item.precio <= max;
          }
        );

        this.productos.forEach((element, index) => {
          this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
        });

        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  buscar_por_categoria(){
    console.log(this.filtro_cat_productos);
    this.load_data = true;
    if(this.filtro_cat_productos == 'todos'){
      this.obtenerProductos('');
    }else{
      
      this._clienteService.listar_productos_publicos('').subscribe(
        response => {

          this.productos = response.data;

          this.productos.forEach((element, index) => {
            this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
          });

          this.productos = this.productos.filter(
            (item:any)=> item.categoria == this.filtro_cat_productos);
  
        },
        error => {
          console.log(error);
        }
      )
      
      
    }
  }

  reset_productos(){
    this.obtenerProductos('');
  }
}
