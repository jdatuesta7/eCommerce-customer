import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public token;
  public id;
  public usuario : any = undefined;
  public usuario_datos : any = {};

  constructor(
    private _clienteService: ClienteService
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
      response => {
        this.usuario = response.data;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));

        if(localStorage.getItem('usuario')){
          this.usuario_datos = JSON.parse(localStorage.getItem('usuario')!);
        }else{
          this.usuario_datos = undefined;
        }
      },
      error => {
        console.log(error.message);
        this.usuario_datos = undefined;
      }
    );
   }

  ngOnInit(): void {
  }

}
