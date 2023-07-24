import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../app/modelo/Usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://localhost:8080/api/usuario';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  //Listar todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get(this.url.concat('/todos'))
      .pipe(map((data) => data as Usuario[]));
  }

  //Listar todos los usuarios activos
  getUsuariosActivos(): Observable<Usuario[]> {
    return this.http
      .get(this.url.concat('/activos'))
      .pipe(map((data) => data as Usuario[]));
  }

  //Listar todos los usuarios inactivos
  getUsuariosInactivos(): Observable<Usuario[]> {
    return this.http
      .get(this.url.concat('/inactivos'))
      .pipe(map((data) => data as Usuario[]));
  }
  
  //Actualizar el estado del usuario
  getUpdateEstado(id: number, usu: Usuario): Observable<number> {
    const url = `${this.url}/actualizarest/${id}`;
    return this.http.put<number>(url, usu);
  }
}
