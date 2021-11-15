import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
  ) { 
    this.token = localStorage.getItem('token');
    if(this.token){
      this._router.navigate(['/']);
    }
   }

  ngOnInit(): void {
  }

  login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      };

      this._clienteService.login_cliente(data).subscribe(
        response=>{
          console.log(response);
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              color: 'red',
              position: 'topRight',
              titleColor: '#FF0000',
              message: response.message
            })
          }else{
            
            let msg = 'Bienvenido, '+response.data.nombres+'!';

            this.usuario = response.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this._clienteService.obtener_cliente_guest(response.data._id, response.token).subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.log(error);
              }
            );

            this._router.navigate(['/']);

            iziToast.show({
              title: 'BIENVENIDO',
              color: 'green',
              position: 'topRight',
              titleColor: '#000000',
              message: msg
            })
          }

        },
        error=>{
          console.log(error);

        }
      );   
    }else{
      iziToast.show({
        title: 'ERROR',
        color: 'red',
        position: 'topRight',
        message: 'Debe ingresar su usuario y contraseña'
      })
    }
  }
}
