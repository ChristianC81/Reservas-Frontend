import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Salon } from '../app/modelo/Salon';
import { SalonDto } from 'src/app/modelo/SalonDto';
import { PublicacionDto } from 'src/app/modelo/dto/PublicacionDto';


@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private baseUrl: string = 'http://localhost:8080/api/salon';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getPublicaciones(): Observable<any> {
    return this.http.get(this.baseUrl.concat("/listarPublicaciones")).pipe(
      map(response => response as PublicacionDto[])
    );
  }

  getPublicacionesByUsuario(email: string): Observable<any> {
    return this.http.get(this.baseUrl.concat("/listPublicacionesByUser/" + email)).pipe(
      map(response => response as PublicacionDto[])
    );
  }

  eliminarSalon(id: number): Observable<Salon> {
    const url = `${this.baseUrl}/eliminar/${id}`;
    return this.http.delete<Salon>(url);
  }

  createSalon(salon: SalonDto, emailUser: String): Observable<any> {
    const URLcrearSalon: string = `${this.baseUrl}/crear?emailPublicador=${emailUser}`;
    return this.http.post<any>(URLcrearSalon, salon);
  }

  getSalon(id: number): Observable<Salon> {
    return this.http.get<Salon>(`${this.baseUrl}/${id}`);
  }



  subirFoto(archivo: File, id: any): Observable<Salon> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${this.baseUrl}/upload/`, formData).pipe(
      map((response: any) => response.producto as Salon),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  // POST IMAGE
  postImage(imagen: string[], idSalon: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/postImage', imagen, {
      params: {
        idSalon: idSalon
      }
    });
  }


  //Métodos para el administrador

  //Listar todos los salones activos
  getSalonesActivos(): Observable<Salon[]> {
    return this.http.get(this.baseUrl.concat("/activos")).pipe(
      map(data => data as Salon[])
    );
  }
  //Listar todos los salones inactivos
  getSalonesInactivos(): Observable<Salon[]> {
    return this.http.get(this.baseUrl.concat("/inactivos")).pipe(
      map(data => data as Salon[])
    );
  }
  //Actualizar el estado del salon
  getUpdateEstado(id: number, sal: Salon): Observable<number> {
    const url = `${this.baseUrl}/actualizarest/${id}`;
    return this.http.put<number>(url, sal);
  }

  getCategoria(): Observable<any> {
    return this.http.get(this.baseUrl.concat("/listCategorias")).pipe(
      map(data => data as any)
    );
  }

}