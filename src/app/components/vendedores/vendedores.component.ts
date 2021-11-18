import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  public filtro = '';
  public vendedores : Array<any> = [];
  public url;

  constructor(
    private _clienteService: ClienteService
  ) { 
    this.url = GLOBAL.url;
    this._clienteService.listar_vendedores_filtro_publico(this.filtro).subscribe(
      response => {
        console.log(response.data);
        this.vendedores = response.data;
      },
      error => {
        console.log(error);
      }
    )
   }

  ngOnInit(): void {
  }

}
