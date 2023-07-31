import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Persona } from '../app/modelo/Persona';
import { Usuario } from '../app/modelo/Usuario';
import { Email } from '../app/modelo/Email';

@Injectable({
  providedIn: 'root',
})
export class ServiLoginRegService {
  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/api';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  // VERIFICAR DISPONIBILIDAD DE EMAIL
  checkAvailableEmail(email: string) {
    return this.http.get<boolean>(
      this.url + '/usuario/checkAvailableEmail/' + email
    );
  }

  // VERIFICAR DISPONIBILIDAD DE NOMBRE DE USUARIO
  checkAvailableUsername(username: string) {
    return this.http.get<boolean>(
      this.url + '/usuario/checkAvailableUsername/' + username
    );
  }

  // ENVIAR CODIGO DE VERIFICACION
  sentCodeVerification(e: Email) {
    return this.http.post<boolean>(this.url + '/email/sentCodeVerification', e);
  }

  // REGISTRAR A LA PERSONA
  registrarPersona(p: Persona) {
    return this.http.post<Persona>(this.url + '/persona/crear', p);
  }

  // REGISTRAR AL USUARIO
  registrarUsuario(idPersona: number, email: string, username: string, password: string) {
    return this.http.post<Usuario>(this.url + '/usuario/crear', null, {
      params: {
        idPersona: idPersona,
        username: username,
        password: password,
        email: email,
      }
    });
  }

  verificarDni(persona: Persona) {
    return this.http.get<boolean>(
      this.url + '/persona/verificar/' + persona.dniPasaporte
    );
  }

  iniSesion(usu: Usuario) {
    return this.http.post<Usuario>(this.url + '/usuario/login', usu);
  }

  //send code verification

  sentCodeReset(e: Email) {
    return this.http.post<Email>(this.url + '/email/sendCodeReset', e);
  }

  resetPass(e: Email):Observable <Email>{
    return this.http.post<Email>(this.url + '/email/resetPas', e);
  }
  
  blockPass(e:Email){
    return this.http.post<number>(this.url+'/usuario/blockUpdatePass',e);
  }

  sendStatePedi(e:Email){
    return this.http.post<boolean>(this.url+'/email/sendInfoReser',e);
  }
}
