import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Complemento } from '../app/modelo/Complemento';
import { GrupocomplementoService } from './grupocomplemento.service';

@Injectable({
  providedIn: 'root'
})
export class ComplementoService {

  private URLlistarComplementos: string = 'http://localhost:8080/api/complemento';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

   

  constructor(private http: HttpClient, private grupoComplementoService: GrupocomplementoService) { }


  getComplementos(): Observable<Complemento[]> {
    return this.http.get(this.URLlistarComplementos).pipe(
      map(response => response as Complemento[])
    );
  }

  createComplemento2(complemento: Complemento): Observable<Complemento> {
    
    const URLcrearComplemento: string = `${this.URLlistarComplementos}/crear`;

    return this.http.post<Complemento>(URLcrearComplemento, complemento, { headers: this.httpHeaders });
  }

  ListarNombresComplementos(): Observable<string[]> {
    const url = `${this.URLlistarComplementos}/nombrecomplementos`;
    return this.http.get<string[]>(url);
  }
  


  //Al crear un complemento, pertence al ultimo id creado del grupo_complemento
  createComplemento(complemento: Complemento): Observable<Complemento> {
    return this.grupoComplementoService.obtenerUltimoIdGrupoComplemento().pipe(
      switchMap((ultimoId: number) => {
        complemento.grupocomplemento.comgrupoid = ultimoId; 
        const URLcrearComplemento: string = `${this.URLlistarComplementos}/crear`;
        return this.http.post<Complemento>(URLcrearComplemento, complemento, { headers: this.httpHeaders });
      })
    );
  }
  
  getComplemento(id: number): Observable<Complemento> {
    return this.http.get<Complemento>(`${this.URLlistarComplementos}/${id}`);
  }
  eliminarComplemento(id: number): Observable<Complemento> {
    return this.http.delete<Complemento>(`${this.URLlistarComplementos}/${id}`);
  }


}
