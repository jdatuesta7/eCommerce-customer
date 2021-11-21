import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var noUiSlider: any
declare var $: any;
declare var iziToast:any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public categorias_global: any = {};
  public filtro_categorias = '';
  public productos: Array<any> = [];
  public filtro_producto = '';
  public load_data = true;
  public url;
  public filtro_cat_productos = 'todos';
  public route_categoria: any;
  public page = 1;
  public pageSize = 6;
  public sort_by = 'Defecto';
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
    this.obtenerCategorias();

    this._route.params.subscribe(
      params => {
        this.route_categoria = params['categoria'];
        console.log(this.route_categoria);

        if (this.route_categoria) {
          this.load_data = true;
          this._clienteService.listar_productos_publicos(this.filtro_producto).subscribe(
            response => {
              this.productos = response.data;

              this.productos.forEach((element, index) => {
                this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
              });

              this.productos = this.productos.filter((item: any) => item.categoria.toLowerCase() == this.route_categoria);

              this.load_data = false;
            },
            error => {
              console.log(error);
            }
          )
        } else {
          this.obtenerProductos('');
        }
      }
    )

  }

  obtenerCategorias() {
    this._clienteService.obtener_categorias_publico().subscribe(
      response => {
        this.categorias_global = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerProductos(filtro: any) {
    this.load_data = true;
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

    } else {
      this.obtenerCategorias();
    }
  }

  buscar_productos() {
    this.obtenerProductos(this.filtro_producto);
  }

  buscar_precios() {

    this.load_data = true;
    this._clienteService.listar_productos_publicos('').subscribe(
      response => {
        this.productos = response.data;

        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());

        // console.log(minimo, maximo);

        this.productos = this.productos.filter(
          (item: any) => {
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

  buscar_por_categoria() {
    console.log(this.filtro_cat_productos);

    if (this.filtro_cat_productos == 'todos') {
      this.obtenerProductos('');
    } else {

      this.load_data = true;
      this._clienteService.listar_productos_publicos('').subscribe(
        response => {

          this.productos = response.data;

          this.productos.forEach((element, index) => {
            this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
          });

          this.productos = this.productos.filter((item: any) => item.categoria == this.filtro_cat_productos);

          this.load_data = false;
        },
        error => {
          console.log(error);
        }
      )

    }
  }

  reset_productos() {
    this.obtenerProductos('');
  }

  ordenar_por() {
    console.log(this.sort_by);
    if (this.sort_by == 'Defecto') {
      this.obtenerProductos('');

    } else if (this.sort_by == 'Popularidad') {
      this.productos.sort((a, b) => {

        if (a.nventas < b.nventas) {
          return 1;
        }
        if (a.nventas > b.nventas) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });

    } else if (this.sort_by == '+-Precio') {
      this.productos.forEach((element, index) => {
        this.productos[index].precio = parseFloat(element.precio.replace(/[.]/g, ""));
      });

      console.log(this.productos);

      this.productos.sort((a, b) => {

        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });

      this.productos.forEach((element, index) => {
        this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
      });

    } else if (this.sort_by == '-+Precio') {
      this.productos.forEach((element, index) => {
        this.productos[index].precio = parseFloat(element.precio.replace(/[.]/g, ""));
      });

      console.log(this.productos);

      this.productos.sort((a, b) => {

        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });

      this.productos.forEach((element, index) => {
        this.productos[index].precio = new Intl.NumberFormat().format(element.precio);
      });
    } else if (this.sort_by == 'azTitulo') {
      this.productos.sort((a, b) => {

        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
      });
    }else if(this.sort_by == 'zaTitulo'){
      this.productos.sort((a, b) => {

        if(a.titulo < b.titulo) {
          return 1;
        }
        if (a.titulo > b.titulo) {
          return -1;
        }
        // a debe ser igual que b
        return 0;
    });
    }
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
