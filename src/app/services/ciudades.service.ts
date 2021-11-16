import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(private _http: HttpClient) { 
  }

  listar_ciudades_colombia():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get('https://www.datos.gov.co/resource/xdk5-pm3f.json', {headers: headers});
  }
}
