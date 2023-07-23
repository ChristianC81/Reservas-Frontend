import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../modelo/Persona';
import { Usuario } from '../modelo/Usuario';
import { IfStmt } from '@angular/compiler';
import { Validaciones } from '../modelo/Validaciones';
import { ServiLoginRegService } from '../../service/servi-login-reg.service';
import { Rol } from '../modelo/Rol';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PersonaService } from '../../service/persona.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  //recupero los elementos para hacer una validacion iteractiva
  @ViewChild('contNom') contNom: ElementRef;
  @ViewChild('contApe') contApe: ElementRef;
  @ViewChild('contCedu') contCedu: ElementRef;
  @ViewChild('contMov') contMov: ElementRef;
  @ViewChild('contContra') contContra: ElementRef;
  @ViewChild('contRepContra') contRepContra: ElementRef;
  @ViewChild('contFechaNac') contFechaNac: ElementRef;
  @ViewChild('contTele') contTele: ElementRef;

  //variables booleanas
  protected bolNomVac: boolean = false;
  protected bolApeVac: boolean = false;
  protected bolCeduVac: boolean = false;
  protected bolMovVac: boolean = false;
  protected bolTelVac: boolean = false;
  protected bolConForm: boolean = false;
  protected bolConRepVac: boolean = false;
  protected bolFecNac: boolean = false;
  bolGenVac: boolean = false;

  protected modeloPersona: Persona = new Persona();
  protected modeloUsuario: Usuario = new Usuario();
  protected modeloRol: Rol = new Rol();
  protected validar: Validaciones = new Validaciones();
  protected user: string = '';
  protected gmail: string = '';
  //en caso inicia sesion con facebook
  protected firstName: string = '';
  protected lastName: string = '';

  protected repContra: string = '';
  protected contador: number = 0;
  constructor(private router: Router, private service: ServiLoginRegService) {}

  ngOnInit(): void {
    this.recuperarData();
  }

  recuperarData() {
    this.user = localStorage.getItem('user') ?? '';
    this.gmail = localStorage.getItem('email') ?? '';
    this.firstName = localStorage.getItem('firstName') ?? '';
    this.lastName = localStorage.getItem('lastName') ?? '';
    // this.modeloPersona.email = this.gmail;
    this.modeloUsuario.nombreUsuario = this.user;
    this.modeloUsuario.email = this.gmail;
    if (this.lastName !== '' && this.firstName !== '') {
      this.modeloPersona.nombre = this.firstName;
      this.modeloPersona.apellido = this.lastName;
    }
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('user');
    localStorage.removeItem('email');

    if (this.user == '') {
      this.router.navigate(['loginReg']);
    }
  }

  validarVacDatos() {
    //eliminar espacios

    this.modeloPersona.nombre = this.modeloPersona.nombre
      .trim()
      .toUpperCase();
    this.modeloPersona.apellido = this.modeloPersona.apellido
      .trim()
      .toUpperCase();
    this.modeloPersona.dniPasaporte =
      this.modeloPersona.dniPasaporte.trim();
    this.modeloPersona.celular = this.modeloPersona.celular.trim();
    this.modeloUsuario.contrasenia =
      this.modeloUsuario.contrasenia.trim();
    this.repContra = this.repContra.trim();
    this.modeloPersona.telefono = this.modeloPersona.telefono.trim();

    if (
      this.modeloPersona.nombre != '' &&
      this.modeloPersona.apellido != '' &&
      this.modeloPersona.dniPasaporte != '' &&
      this.modeloPersona.celular != '' &&
      this.modeloUsuario.contrasenia != '' &&
      this.repContra != ''
    ) {
      this.reiniciarEstilo();
      //ningun problema al registrar
      this.contador = 0;
      //validar cedula

      if (this.validar.validarDni(this.modeloPersona.dniPasaporte)) {
        this.contCedu.nativeElement.classList.toggle('borderAlert', false);
        this.bolCeduVac = false;
      } else {
        this.contCedu.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolCeduVac = true;
      }

      //validar edad
      if (this.validar.calcularEdad(this.modeloPersona.fechaNac) < 18) {
        this.contFechaNac.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolFecNac = true;
      } else {
        this.contFechaNac.nativeElement.classList.toggle('borderAlert', false);
        this.bolFecNac = false;
      }

      //validar que las contraseñas sean iguales

      if (this.modeloUsuario.contrasenia === this.repContra) {
        this.contContra.nativeElement.classList.toggle('borderAlert', false);
        this.contRepContra.nativeElement.classList.toggle('borderAlert', false);
        this.bolConRepVac = false;

        //validar si las contraseñas no son debiles
        if (this.validar.validarContrasena(this.modeloUsuario.contrasenia)) {
          this.contContra.nativeElement.classList.toggle(
            'borderAlertPassDebil',
            false
          );
          this.contRepContra.nativeElement.classList.toggle(
            'borderAlertPassDebil',
            false
          );
          this.bolConForm = false;
        } else {
          this.contContra.nativeElement.classList.toggle(
            'borderAlertPassDebil',
            true
          );
          this.contRepContra.nativeElement.classList.toggle(
            'borderAlertPassDebil',
            true
          );
          this.contador += 1;
          this.bolConForm = true;
        }
      } else {
        this.contContra.nativeElement.classList.toggle('borderAlert', true);
        this.contRepContra.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolConRepVac = true;
        this.bolConForm = false;
      }

      //celular
      if (this.validar.validarMovil(this.modeloPersona.celular)) {
        this.contMov.nativeElement.classList.toggle('borderAlert', false);
        this.bolMovVac = false;
      } else {
        this.contMov.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolMovVac = true;
      }

      //telefono
      if (this.validar.validarTelefono(this.modeloPersona.telefono)) {
        this.contTele.nativeElement.classList.toggle('borderAlert', false);
        this.bolTelVac = false;
      } else {
        this.contTele.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolTelVac = true;
      }

      //validar nombre persona
      if (this.validar.validarNombre(this.modeloPersona.nombre)) {
        this.contNom.nativeElement.classList.toggle('borderAlert', false);
        this.bolNomVac = false;
      } else {
        this.contNom.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolNomVac = true;
      }

      //validar nombre apellido
      if (this.validar.validarApellido(this.modeloPersona.apellido)) {
        this.contApe.nativeElement.classList.toggle('borderAlert', false);
        this.bolApeVac = false;
      } else {
        this.contApe.nativeElement.classList.toggle('borderAlert', true);
        this.contador += 1;
        this.bolApeVac = true;
      }

      console.log("llego")

      //si todo esta correcto registrar
      if (this.contador === 0) {
        this.service.registrarPersona(this.modeloPersona).subscribe((data) => {
          console.log("PASA REGISTRO DE PERSONA", data)
          this.service.registrarUsuario(data.idPersona, this.modeloUsuario.email, this.modeloUsuario.nombreUsuario, this.modeloUsuario.contrasenia)
            .subscribe((data) => {
              console.log("data", data);
              Swal.fire('REGISTRO', 'USUARIO CREADO EXITOSAMENTE', 'success');
            }, (err) => {
              console.log("error", err);
              Swal.fire('REGISTRO', 'ERROR AL CREAR USUARIO', 'error');
            } 
            );
        }, (err) => {
          console.log("error", err);
          Swal.fire('REGISTRO', 'ERROR AL CREAR PERSONA', 'error');
        }
        );
      }
    } else {
      //problemas al registrar

      this.contNom.nativeElement.classList.toggle(
        'borderAlert',
        this.modeloPersona.nombre === ''
      );
      this.contApe.nativeElement.classList.toggle(
        'borderAlert',
        this.modeloPersona.apellido === ''
      );
      this.contCedu.nativeElement.classList.toggle(
        'borderAlert',
        this.modeloPersona.dniPasaporte === ''
      );
      this.contMov.nativeElement.classList.toggle(
        'borderAlert',
        this.modeloPersona.celular === ''
      );
      this.contContra.nativeElement.classList.toggle(
        'borderAlert',
        this.modeloUsuario.contrasenia === ''
      );
      this.contRepContra.nativeElement.classList.toggle(
        'borderAlert',
        this.repContra === ''
      );
      this.contFechaNac.nativeElement.classList.toggle(
        'borderAlert',
        this.validar.calcularEdad(this.modeloPersona.fechaNac) < 18
      );
      this.bolGenVac = true;
    }
  }

  private reiniciarEstilo() {
    this.bolGenVac = false;
    this.contNom.nativeElement.classList.toggle('borderAlert', false);
    this.contApe.nativeElement.classList.toggle('borderAlert', false);
    this.contCedu.nativeElement.classList.toggle('borderAlert', false);
    this.contMov.nativeElement.classList.toggle('borderAlert', false);
    this.contContra.nativeElement.classList.toggle('borderAlert', false);
    this.contRepContra.nativeElement.classList.toggle('borderAlert', false);
    this.contFechaNac.nativeElement.classList.toggle('borderAlert', false);
  }
}
