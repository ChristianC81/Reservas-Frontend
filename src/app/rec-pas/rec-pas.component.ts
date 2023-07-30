import { Component } from '@angular/core';
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
  email:Email= new Email();
  
  correoConst:string ="";

  protected btnSendCode: boolean = false;
  protected gmailVac: boolean = false;
  protected gmailNoVali: boolean = false;
  protected codeVac: boolean = false;
  protected lblSendCode:boolean= false;
  protected vali: Validaciones = new Validaciones();
  protected bandera: number = 0;
  constructor(private serv: ServiLoginRegService, private router: Router) { }



  //enviar a verificar email
 
  sendCode(){
    //validar correo no vacío

    if(this.email.to==""){
      this.gmailVac=true;
    
    }else{
      this.gmailVac=false;
      //validar formato correo
      
      if(this.vali.validarCorreo(this.email.to)){
        this.correoConst=this.email.to;
        this.gmailNoVali=false;
      }else{
        this.gmailNoVali=true;
      }

    }
   
  }
  /*
this.correoConst=this.email.to;
    this.serv.sentCodeReset(this.email).subscribe((data)=>{
      

    });*/
}
