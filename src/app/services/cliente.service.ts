import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  login_cliente(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_cliente', data, {headers: headers});
  }

  obtener_cliente_guest(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'obtener_cliente_guest/'+id, {headers: headers});
  }

  actualizar_perfil_cliente_guest(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+'actualizar_perfil_cliente_guest/'+id, data, {headers: headers});
  }

  public isAuthenticated():boolean{

    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);

      console.log(decodedToken);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }

    } catch (error) {
      localStorage.clear();
      console.log(error);
      return false;
    }
    
    return true;
  }

  obtener_categorias_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_categorias_publico', {headers: headers});
  }

  listar_productos_publicos(filtro:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_publicos/'+filtro, {headers: headers});
  }

  listar_productos_nuevos_publicos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_nuevos_publicos', {headers: headers});
  }

  listar_productos_tendencia_publicos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_tendencia_publicos', {headers: headers});
  }

  listar_vendedores_filtro_publico(filtro:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_vendedores_filtro_publico/'+filtro, {headers: headers});
  }

  listar_productos_vendedor_publicos(local:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_vendedor_publicos/'+local, {headers: headers});
  }

  obtener_vendedor_publico(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_vendedor_publico/'+id, {headers: headers});
  }

  obtener_producto_publico(slug:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'obtener_producto_publico/'+slug, {headers: headers});
  }

  listar_productos_recomendados_publicos(categoria:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'listar_productos_recomendados_publicos/'+categoria, {headers: headers});
  }

}
