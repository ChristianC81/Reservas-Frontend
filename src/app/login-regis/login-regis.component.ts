import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { forkJoin } from 'rxjs';
import { Usuario } from '../modelo/Usuario';
import { Persona } from '../modelo/Persona';
import { ServiLoginRegService } from '../../service/servi-login-reg.service';
import Swal from 'sweetalert2';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Validaciones } from '../modelo/Validaciones';
import { Email } from '../modelo/Email';
import { UsuarioService } from '../../service/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.css'],
})
export class LoginRegisComponent {
  //constructor donde paso los servicios y el ruta para regidigir
  user: SocialUser;
  loggedIn: boolean;
  //creo el modelo usuario donde se almacenaran los datos
  modeloUsuarioSesPc: Usuario = new Usuario();
  modeloEmail: Email = new Email();
  vali: Validaciones = new Validaciones();
  //sirve para validar datos vacios o erroneos
  bandera: number = 0;
  //datos registros temporal
  emailReg: string = '';
  usuarioReg: string = '';

  ngOnInit() {
    /* this.authService.authState.subscribe((user) => {
       this.user = user;
       this.loggedIn = (user != null);
     });*/
  }
  //constructor donde paso los servicios y el ruta para regidigir
  //ELIMINAR TEMPORAL TOASTR
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private serviLoginRegService: ServiLoginRegService,
    private authService: SocialAuthService,
    private usuarioService: UsuarioService,
  ) { }

  /* sirve para poner las animaciones  */
  /* en el html hay que agregar un #idname */
  /* posdata en el tsconfig.json se desactiva el requerimiento para obligar a definir las variables  */
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    //comprobar si el correo esta registrado en la base de datos caso contrario mandar a la web principal
    this.authService.authState.subscribe((user) => {
      //verifico que exista el usuario
      if (user != null) {
        this.serviLoginRegService.checkAvailableEmail(user.email).subscribe((data) => {
          //verifico si el correo no existe para mandar a registrar

          if (data) {
            //registrado mando a principal
            alert('registrado');
          } else {
            //no registrado mando al registro
            localStorage.setItem('user', user.firstName + user.id.slice(0, 4));
            localStorage.setItem('email', user.email);
            localStorage.setItem('firstName', user.firstName);
            localStorage.setItem('lastName', user.lastName);
            this.router.navigate(['regisUsu']);
          }
        });
      }
    });
  }

  /*intercambiar de login a resgistro pc*/
  @ViewChild('imgBtn') imgBtn: ElementRef;
  @ViewChild('cont') cont: ElementRef;
  /*intercambiar de login a registro movil */
  @ViewChild('conIni') conIni: ElementRef;
  @ViewChild('btnDesIni') btnDesIni: ElementRef;
  @ViewChild('conRegi') conReg: ElementRef;
  @ViewChild('btnDesReg') btnDesReg: ElementRef;

  //boleanos para activar las alertas
  //alertas sesion pc
  bolCamVacSesPc: boolean = false;
  bolUsuPassErr: boolean = false;
  bolEmaReg: boolean = false;
  bolUsuReg: boolean = false;
  bolRegVac: boolean = false;
  bolValiGmail: boolean = false;
  bolValiUser: boolean = false;
  //variable sesion movil
  bolUsuPassMov: boolean = false;
  bolUsuVacMov: boolean = false;
  bolUsuVacReg: boolean = false;
  //alertas registro
  bolEmaRegMov: boolean = false;
  bolUsuRegMov: boolean = false;
  bolRegVacMov: boolean = false;
  bolValiGmailMov: boolean = false;
  bolValiUserMov: boolean = false;

  private codVer: number = 0;
  /* llamar a css con elemento a modificar  vista pc*/
  toggleSignup() {
    this.cont.nativeElement.classList.toggle('s--signup');
  }

  /*vista movil */
  desacSesi() {
    this.conIni.nativeElement.classList.toggle('inaCont');
    this.conReg.nativeElement.classList.toggle('actiCont');
  }

  desacReg() {
    this.conIni.nativeElement.classList.toggle('actiCont');
    this.conReg.nativeElement.classList.toggle('inaCont');
  }
  ngAfterViewInit() {
    this.imgBtn.nativeElement.addEventListener(
      'click',
      this.toggleSignup.bind(this)
    );
    this.btnDesIni.nativeElement.addEventListener(
      'click',
      this.desacSesi.bind(this)
    );
    this.btnDesReg.nativeElement.addEventListener(
      'click',
      this.desacSesi.bind(this)
    );
    /*
    agregar animacion de otra forma  el punto maneja las clases 
        const imgBtn = this.elementRef.nativeElement.querySelector('.img__btn');
        const cont = this.elementRef.nativeElement.querySelector('.cont');
    if (imgBtn && cont) {
          imgBtn.addEventListener('click', () => {
            cont.classList.toggle('s--signup');
          });
        }
    */
  }

  verificarSesioPc() {
    //movil
    this.bolUsuPassMov = false;
    this.bolUsuVacMov = false;
    //pc
    this.bolCamVacSesPc = false;
    this.bolUsuPassErr = false;

    if (this.modeloUsuarioSesPc.email != '' && this.modeloUsuarioSesPc.contrasenia != '') {

      if (this.modeloUsuarioSesPc.email == 'admin' && this.modeloUsuarioSesPc.contrasenia == 'admin') {
        this.bolUsuPassErr = false;
        this.bolUsuPassMov = false;
      
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: `Bienvenido Administrador`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Continuar',
        }).then((resulta) => {
          this.router.navigate(['/admininicio']).then(valt => {
            location.reload();
          });
        });
      } else {  //datos
        this.serviLoginRegService.iniSesion(this.modeloUsuarioSesPc).subscribe(
          async (data) => {
            if (data !== null) {
              localStorage.setItem('emailUserLoged', data.email);
              localStorage.setItem('username', data.nombreUsuario);
              Swal.fire({
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido ${data.nombreUsuario}`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Continuar',
              }).then((result) => {
                this.router.navigate(['/home']).then(val => {
                  location.reload();
                });
              });

              // sessionStorage.setItem('rol', data.rol.nombre);

            } else {
              this.bolUsuPassErr = true;
              this.bolUsuPassMov = true;
              Swal.fire(
                'Inicio de sesión fallido',
                `Ocurrió un error al iniciar sesión, verifique que los datos con los que intenta acceder sean correctos.`,
                'error'
              );
            }
          }
          ,
          (error: HttpErrorResponse) => {
            this.bolUsuPassErr = true;
            this.bolUsuPassMov = true;
            Swal.fire(
              'Inicio de sesión fallido',
              `Ocurrió un error al iniciar sesión, verifique que los datos con los que intenta acceder sean correctos`,
              'error'
            );
          }
        );
      }
    } else {
      //datos vacios muestra la alerta
      this.bolCamVacSesPc = true;
      this.bolUsuVacMov = true;
    }
  }

  // showSuccessToast(title: string, message: string) {
  //   // CREAMOS UN TOAST CON ESTILOS Y COLORES
  //   this.toastr.success(message, title, {
  //     timeOut: 3000,
  //     positionClass: 'toast-bottom-right',
  //     progressBar: true,
  //     progressAnimation: 'increasing',
  //     closeButton: true,
  //     enableHtml: true,
  //     toastClass:'my-custom-class'

  //   });

  // }

  validarRegistroSinFac() {
    //pc
    this.bolEmaReg = false;
    this.bolUsuReg = false;
    this.bolRegVac = false;
    this.bolValiGmail = false;
    this.bolValiUser = false;

    //movil
    this.bolEmaRegMov = false;
    this.bolUsuRegMov = false;
    this.bolRegVacMov = false;
    this.bolValiGmailMov = false;
    this.bolValiUserMov = false;
    if (this.emailReg != '' && this.usuarioReg != '') {
      //variable para almacenar los bool retornados
      let valiG = this.vali.validarCorreo(this.emailReg);
      let valiU = this.vali.validarUsuario(this.usuarioReg);

      //verificar si el gmail o user es valido

      if (valiG && valiU) {
        //si son validos pasar a la siguiente que es envio de codigo
        let obs1$ = this.serviLoginRegService.checkAvailableEmail(this.emailReg);
        let obs2$ = this.serviLoginRegService.checkAvailableUsername(this.usuarioReg);
        console.log("OBJ1", obs1$);
        console.log("OBJ2", obs2$);
        //realizo una consulta multiple con datos asincronos al api
        forkJoin([obs1$, obs2$]).subscribe({
          next: ([bolEma, bolUsu]) => { // EL VALOR DEBE SER TRUE, TRUE PARA SABER QUE LOS DOS DATOS ESTAN DISPONIBLES
            // this.bolEmaReg = bolEma;
            // this.bolUsuReg = bolUsu;
            this.bolEmaRegMov = bolEma;
            this.bolUsuRegMov = bolUsu;

            console.log("PASO", bolEma, bolUsu);
            // this.showSuccessToast("OK", "TEST");

            //recibo los datos si hay no registrados
            if (bolUsu && bolEma) {
              //mando el mensaje de verificacion
              this.enviarCodigoVerificacion();

              //no hay registros
              Swal.fire({
                title: 'Verificación',
                input: 'number',
                inputLabel: 'Revise el codigo en su bandeja del correo o spam',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: true,
                allowEscapeKey: true,
                //es el valor que ingresa la persona
                preConfirm: (value) => {
                  return new Promise((resolve) => {
                    //el valor que ingresa la persona se compara
                    if (value == this.codVer) {
                      localStorage.setItem('user', this.usuarioReg);
                      localStorage.setItem('email', this.emailReg);

                      this.router.navigate(['regisUsu']);
                      Swal.close();
                    } else {
                      resolve(Swal.showValidationMessage('Código incorrecto'));
                    }
                  });
                },
              }).then((result) => {
                if (result.isConfirmed) {
                }
              }).catch(
                (error) => {
                  Swal.fire('ENVIO DE CODIGO', 'ERROR AL ENVIAR EL CODIGO DE VERIFICACION', 'error');
                }
              );

              //si ya esta registrado el correo
            } else {
              Swal.fire('ATENCIÓN', 'SU CORREO YA SE ENCUENTRA REGISTRADO', 'warning');
            }
          },
          error: (error) => {
            Swal.fire('ERROR', 'ERROR AL VERIFICAR LOS DATOS', 'error');
          }
        });

        //termina verifiacion de usuaio gmail
      } else {
        //valida que los usuario y gmail sean corrrectos
        if (!valiG) {
          this.bolValiGmail = true;
          this.bolValiGmailMov = true;
        }
        if (!valiU) {
          this.bolValiUser = true;
          this.bolValiUserMov = true;
        }
      }
    } else {
      //datos de registro vacio
      this.bolRegVac = true;
      this.bolRegVacMov = true;
    }
  }

  enviarCodigoVerificacion() {
    this.modeloEmail.to = this.emailReg;
    this.modeloEmail.subject = 'Codigo de verificación';
    this.codVer = this.vali.generarCodigoVeri();
    console.log(this.codVer);
    this.modeloEmail.text = this.codVer + '';
    this.modeloEmail.from = '';
    this.serviLoginRegService
      .sentCodeVerification(this.modeloEmail)
      .subscribe((data) => {
        Swal.showValidationMessage('Código de verificación enviado');
      });
  }

}
