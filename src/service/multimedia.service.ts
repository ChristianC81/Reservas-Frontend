import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Multimedia } from 'src/app/modelo/Multimedia';
import { MultimediaDto } from 'src/app/modelo/dto/MultimediaDto';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  private baseUrl: string = 'http://localhost:8080/api/multimedia';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  eliminarMultimedia(id: number): Observable<Multimedia> {
    const url = `${this.baseUrl}/eliminar/${id}`;
    return this.http.delete<Multimedia>(url);
  }

  getMultimedias(): Observable<any> {
    return this.http.get(this.baseUrl.concat("/listarMultimedias")).pipe(
      map(response => response as MultimediaDto[])
    );
  }

 
}
