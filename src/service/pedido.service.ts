import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Pedido } from '../app/modelo/Pedido';
import { ComplementoDto } from 'src/app/modelo/dto/ComplementoDto';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private URLlistarPedidos: string='http://localhost:8080/api/pedido';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  
  constructor(private http: HttpClient) {}

  getPedidosBySalon(idPedido: number, emailUser: string): Observable<Pedido[]>{
   return this.http.get(this.URLlistarPedidos+"/getPedidosBySalon/"+ idPedido, {
    params: {
      emailUsuario: emailUser
    }
   }).pipe(
      map(response => response as Pedido[])
    );
  }
  create(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(this.URLlistarPedidos + "/crear", pedido, {headers: this.httpHeaders})
  }
  getProducto(id: number):Observable<Pedido>{
    return this.http.get<Pedido>(`${this.URLlistarPedidos}/${id}`);
  }
  eliminar(id: number): Observable<Pedido>{
    return this.http.delete<Pedido>(`${this.URLlistarPedidos}/${id}`);
  }


  updateStatePedido(id:number, estate:boolean){
    return this.http.get<any>(`${this.URLlistarPedidos}/aceptarOrechazarPedidoBySalon/${id}/${estate}`);
  } 

}