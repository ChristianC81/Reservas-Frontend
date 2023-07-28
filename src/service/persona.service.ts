import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../app/modelo/Persona';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private url: string = 'http://localhost:8080/api/persona';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // REGISTRAR PERSONA
  registrarPersona(p: Persona) {
    return this.http.post<Persona>(this.url + '/crear', p);
  }

  //Listar todos los usuarios
  getPesonas(): Observable<Persona[]> {
    return this.http
      .get(this.url.concat('/listar'))
      .pipe(map((data) => data as Persona[]));
  }

  getUsuarioPersona(nombre: string){
    return this.http.get<Persona>(`${this.url}/pernomusuario/${nombre}`);
  }
}
