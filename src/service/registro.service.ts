import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Persona } from "../app/modelo/Persona";
import { Observable } from "rxjs";

export class RegistroService {
    private URLlistarPers: string='http://25.43.143.100:8080/api/producto';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}
  create(persona: Persona): Observable<Persona>{

    return this.http.post<Persona>(this.URLlistarPers, persona, {headers: this.httpHeaders})
  }
}