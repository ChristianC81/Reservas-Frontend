import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from '../modelo/Email';
import { ServiLoginRegService } from 'src/service/servi-login-reg.service';
import { Validaciones } from '../modelo/Validaciones';

@Component({
  selector: 'app-rec-pas',
  templateUrl: './rec-pas.component.html',
  styleUrls: ['./rec-pas.component.css']
})
export class RecPasComponent {
  @ViewChild('btnCodeVer') btnCodeVerHtm: ElementRef;
  @ViewChild('inputCode') inputCodeHtm: ElementRef;
  email: Email = new Email();

  correoConst: string = "";
  protected codeIntr: string = "";
  protected btnSendCode: boolean = true;
  protected btnGenerarCla: boolean = true;
  protected gmailVac: boolean = false;
  protected gmailNoVali: boolean = false;
  protected lblcodeVac: boolean = false;
  protected lblSendCode: boolean = false;
  protected packCode: boolean = true;
  protected inputGmail: boolean = false;
  protected blocBtnCodeVer:boolean=false;

  protected vali: Validaciones = new Validaciones();
  protected bandera: number = 0;
  protected tries = 0;
  private cod: string = "";
  constructor(private serv: ServiLoginRegService, private router: Router) { }
  ngAfterViewInit() {
    this.btnCodeVerHtm.nativeElement.addEventListener(
      'click',
      this.StyelBtbCode.bind(this)
    );
  }





  //enviar a verificar email

  sendCode() {
    this.gmailNoVali = false;
    this.gmailVac = false;
    //validar correo no vacío

    if (this.email.to == "") {
      this.gmailVac = true;

    } else {
      this.gmailVac = false;
      //validar formato correo

      if (this.vali.validarCorreo(this.email.to)) {
        this.correoConst = this.email.to;
        this.gmailNoVali = false;
        //bloquear gmail
        this.inputGmail = true;
        //enviar codigo de verificación
        this.serv.sentCodeReset(this.email).subscribe((data) => {
          //activar alerta
          this.lblSendCode = true;
          //desactivar boton
          this.btnSendCode = false;

          this.cod = data.text;
          //bloquear input
          this.inputGmail = true;
          //activar btn 
          this.btnGenerarCla = true;

          //activar siguiente etapa
          this.packCode = true;
        });


      } else {
        this.gmailNoVali = true;
      }

    }

  }

  private StyelBtbCode() {
    this.lblcodeVac=false;

    if (this.codeIntr!="") {
      this.tries++;
      if (this.tries <= 3) {
        if (this.cod == this.codeIntr) {

        } else {
          switch (this.tries) {

            case 1:
              this.btnCodeVerHtm.nativeElement.textContent = "2 Intentos";
              this.inputCodeHtm.nativeElement.classList.add('alerCodeEror');
              break;

            case 2:
              this.btnCodeVerHtm.nativeElement.textContent = "1 Intentos";
              break;

            case 3:
              this.btnCodeVerHtm.nativeElement.textContent = "Demasiados intentos";
              this.btnCodeVerHtm.nativeElement.classList.add('recover');
              this.inputCodeHtm.nativeElement.classList.add('disabled');
              this.blocBtnCodeVer=true;
              break;
          }
        }

      }
    }else{
      this.lblcodeVac=true
    }

  }

}
