import { Component } from '@angular/core';
import { Persona } from '../modelo/Persona';
import { RegistroService } from '../../service/registro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentRegistro {

  public persona: Persona = new Persona()
  constructor(private personaService: RegistroService, private router: Router,
    private activatedRoute: ActivatedRoute){ }

  public create():void{
    this.personaService.create(this.persona).subscribe(
      persona => {this.router.navigate(['/personas'])

      Swal.fire('Registro Guardado', `Persona ${persona.nombre} guardado con exito`, 'success')
      this.router.navigate(['/home']);
    }
    )
  }
}
