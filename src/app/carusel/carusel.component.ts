import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.css']
})
export class CaruselComponent {
  private angle = 0;
  
  @ViewChild('spinner') spiner: ElementRef;
  constructor() {
    // Obtener la referencia al elemento spinner por su ID

  }

  galleryspin(sign: boolean): void {
    if (!sign) {
      this.angle = this.angle + 45;
    } else {
      this.angle = this.angle - 45;
    }

    // Aplicar la rotación al elemento spinner usando estilos CSS
    this.spiner.nativeElement.style.transform = `rotateY(${this.angle}deg)`;
  }
}
