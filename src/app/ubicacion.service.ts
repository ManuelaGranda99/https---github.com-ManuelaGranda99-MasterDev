import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http: HttpClient) { }

  registrarUbicacion(ubicacion:Data){
    return this.http.put("http://localhost:900/insertarUbicacion",ubicacion)
  };
}
