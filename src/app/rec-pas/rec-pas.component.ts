import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from '../modelo/Email';
import { ServiLoginRegService } from 'src/service/servi-login-reg.service';

@Component({
  selector: 'app-rec-pas',
  templateUrl: './rec-pas.component.html',
  styleUrls: ['./rec-pas.component.css']
})
export class RecPasComponent {
  email:Email= new Email();
  
  correoConst:String ="";

  protected btnSendCode: boolean = false;
  protected gmailVac: boolean = false;
  protected gmailNoVali: boolean = false;
  protected codeVac: boolean = false;
  protected lblSendCode:boolean= false;
  constructor(private serv: ServiLoginRegService, private router: Router) { }



  //enviar a verificar email
 
  sendCode(){
    this.correoConst=this.email.to;
    this.serv.sentCodeReset(this.email).subscribe((data)=>{
      
      if(data){
        

      }else{
        alert("correo no encontrado")
      }

    });
  }

}
