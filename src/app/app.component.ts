import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaInmueblesService } from './consulta-inmuebles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inmobiliaria';
  items: any;
  isLogin: string;

  constructor(private service: ConsultaInmueblesService, private route: Router) {
    this.isLogin = localStorage.getItem("isLogin") || "false";
  }
  ngOnInit(): void {
    this.isLogin = localStorage.getItem("isLogin") || "false";

  }

  logout() {
    localStorage.removeItem("isLogin");
    this.route.navigate(["/user"]);
    location.reload();
  }
}
