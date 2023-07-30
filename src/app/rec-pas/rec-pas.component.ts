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
  gmail:Email= new Email();
  constructor(private serv: ServiLoginRegService, private router: Router) { }



  //enviar a verificar email
 
  sendCode(){
    this.serv.sentCodeReset(this.gmail).subscribe((data)=>{
      
      if(data){
        alert("codigo enviado")
      }else{
        alert("correo no encontrado")
      }

    });
  }

}
