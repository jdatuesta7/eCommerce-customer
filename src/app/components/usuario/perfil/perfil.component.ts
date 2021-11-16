import { Component, OnInit } from '@angular/core';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public id;
  public token;
  public cliente : any = {
    genero: '',
    ciudad: '',
  };
  public colombia_lugares : Array<any> = []; 
  public arr_municipios : Array<any> = []; 

  constructor(
    private _ciudadesService: CiudadesService,
    private _clienteService: ClienteService
  ) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');

    if(this.id && this.token){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.cliente = response.data;
          this.cliente.password = '';
        },
        error => {
          console.log(error);
        }
      );
    }
   }

  ngOnInit(): void {
    this._ciudadesService.listar_ciudades_colombia().subscribe(
      response => {
        this.colombia_lugares = response;
        this.colombia_lugares.forEach(element => {
          this.arr_municipios.push(element.municipio);
        })

      },
      error => {
        console.log(error);
      }
    );
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      console.log(this.cliente);
      this._clienteService.actualizar_perfil_cliente_guest(this.id, this.cliente, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.show({
            title: 'OK',
            color: 'green',
            position: 'topRight',
            titleColor: '#000000',
            message: 'Se ha actualizado correctamente el perfil'
          })
        },
        error => {
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            color: 'red',
            position: 'topRight',
            message: error.error
          });
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe completar todos los campos'
      });
    }
  }

}
