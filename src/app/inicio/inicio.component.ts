import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  implements OnInit{
  constructor(private appModule: AppModule) { }
  ngOnInit(): void {
  }
  ventanaEmergenteVisible: boolean = false;

  mostrarVentanaEmergente() {
    this.ventanaEmergenteVisible = true;
  }

  ocultarVentanaEmergente() {
    this.ventanaEmergenteVisible = false;
  }
  

}
