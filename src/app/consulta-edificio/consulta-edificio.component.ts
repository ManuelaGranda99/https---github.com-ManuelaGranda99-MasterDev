import { Component, OnInit } from '@angular/core';
import { ConsultaEdificioService } from '../consulta-edificio.service';

@Component({
  selector: 'app-consulta-edificio',
  templateUrl: './consulta-edificio.component.html',
  styleUrls: ['./consulta-edificio.component.css']
})
export class ConsultaEdificioComponent implements OnInit {

  disponible:any
  Num=1;
  aconsultar:any;
  resConsulta:any;

  constructor(private service: ConsultaEdificioService) { }

  ngOnInit(): void {
    this.service.getConsulta().subscribe( data=>{
      this.disponible=data;      
    });
  }

  consultaInmueble(){
    let tipo = (document.getElementById("consulTipo") as HTMLInputElement).value;
    let transaccion = (document.getElementById("consulTransaccion") as HTMLInputElement).value;
    let habitaciones = (document.getElementById("consulHabitaciones") as HTMLInputElement).value;
    let barrio = (document.getElementById("consulbarrio") as HTMLInputElement).value;
    
    var inmueble={
      tipo:tipo,
      transaccion:transaccion,
      habitaciones:habitaciones,
      barrio:barrio
    }

    this.service.getConsulInmu(inmueble).subscribe(data => {
      console.log(data);
      this.disponible=data;
    });

    (document.getElementById("consulHabitaciones") as HTMLInputElement).value="";
    (document.getElementById("consulbarrio") as HTMLInputElement).value="";
    (document.getElementById("consulTipo") as HTMLInputElement).value = "selec";
    (document.getElementById("consulTransaccion") as HTMLInputElement).value = "selec";
  }
}