import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConsultaEdificioService {

  constructor(private http: HttpClient) { }

  getEdificio(){
    return this.http.get("http://localhost:900/consultaEdificio?tipo=edificio")
  }
  getConsulInmu(inmueble:any){
    return this.http.get("http://localhost:900/consultaInmu?tipo="+ inmueble.tipo + "&transaccion=" + inmueble.transaccion+"&habitaciones="+inmueble.habitaciones+"&barrio="+inmueble.barrio)
  }
  getConsulta(){
    return this.http.get("http://localhost:900/consulta")
  }
}

