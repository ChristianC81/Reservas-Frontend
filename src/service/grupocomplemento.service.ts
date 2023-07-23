import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GrupoComplemento } from '../app/modelo/GrupoComplemento';

@Injectable({
  providedIn: 'root'
})
export class GrupocomplementoService {

  private URLlistarGrupoComplementos: string = 'http://localhost:8080/api/grupocomplemento';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  obtenerUltimoIdGrupoComplemento(): Observable<number> {
    const url = `${this.URLlistarGrupoComplementos}/ultimoidgrupocom`;
    return this.http.get<number>(url);
  }

  getGrupoComplementos(): Observable<GrupoComplemento[]> {
    return this.http.get(this.URLlistarGrupoComplementos).pipe(
       map(response => response as GrupoComplemento[])
    );
  }

  createGrupoComplemento(grupocomplemento: GrupoComplemento): Observable<GrupoComplemento> {
    const URLcrearGrupoComplemento: string = `${this.URLlistarGrupoComplementos}/crear`;
    return this.http.post<GrupoComplemento>(URLcrearGrupoComplemento, grupocomplemento, { headers: this.httpHeaders });
  }

  getGrupoComplemento(id: number): Observable<GrupoComplemento> {
    return this.http.get<GrupoComplemento>(`${this.URLlistarGrupoComplementos}/${id}`);
  }
  eliminarGrupoComplemento(id: number): Observable<GrupoComplemento> {
    return this.http.delete<GrupoComplemento>(`${this.URLlistarGrupoComplementos}/${id}`);
  }

  
}
