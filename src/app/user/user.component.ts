import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  respuestaRegistro: any;
  aconsultar: any;
  resConsulta: any;
  isLogin: any;

  constructor(private service: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem("isLogin") || "false";
  }

  registrarUsu() {
    let cedula = (document.getElementById("cedula") as HTMLInputElement).value;
    let nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    let apellido = (document.getElementById("apellido") as HTMLInputElement).value;
    let correo = (document.getElementById("correo") as HTMLInputElement).value;
    let celular = (document.getElementById("celular") as HTMLInputElement).value;

    let user = (document.getElementById("user") as HTMLInputElement).value;
    let clave = (document.getElementById("clave") as HTMLInputElement).value;

    var usuario = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      celular: celular,
      user: user,
      clave: clave
    }

    this.service.registrarUsu(usuario).subscribe(data => {
      this.respuestaRegistro = data;
    })
    alert("registrando usuario");
    (document.getElementById("cedula") as HTMLInputElement).value = "";
    (document.getElementById("nombre") as HTMLInputElement).value = "";
    (document.getElementById("apellido") as HTMLInputElement).value = "";
    (document.getElementById("correo") as HTMLInputElement).value = "";
    (document.getElementById("celular") as HTMLInputElement).value = "";
    (document.getElementById("user") as HTMLInputElement).value = "";
    (document.getElementById("clave") as HTMLInputElement).value = "";
    /////////////////
    
    localStorage.setItem("isLogin", "true");
    location.reload();// recarga la pagina

  }

  consultaUsu() {
    let tip = (document.getElementById("consul") as HTMLInputElement).value;
    let val = (document.getElementById("consulta") as HTMLInputElement).value;

    this.aconsultar = tip + ": " + val;

    this.service.getConsulta(tip, val).subscribe(data => {
      this.resConsulta = data;
    })

  }

  login() {
    let tip = (document.getElementById("usuario") as HTMLInputElement).value;
    let val = (document.getElementById("contrasena") as HTMLInputElement).value;


    this.service.login(tip, val).subscribe((data: any) => {
      if (data.respuesta) {
        this.isLogin = data.respuesta.toString();
        localStorage.setItem("isLogin", "true");
        location.reload();// recarga la pagina
      }
    })
  }
}
