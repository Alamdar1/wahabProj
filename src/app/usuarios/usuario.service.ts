import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService, ObjectResponse } from "src/core/base/services/backend-service";
import { environment } from 'src/environments/environment';
import { Observable, map } from "rxjs";
import { UsuarioRegistro } from "../registro/models/usuario-registro.model";

@Injectable({
    providedIn: 'root',
  })
  export class UsuarioService extends BackendService {
    private readonly urlApi: string;
    private readonly resourceUrl: string;
    
  
    constructor(private readonly http: HttpClient) {
      super();
      this.urlApi = `${environment.backendUrl}`;
      this.resourceUrl = '/data';

      const httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    }
  
/*     addUsuario(user: UsuarioRegistro): Observable<boolean> {
        return this.http
        .post<boolean>(
          `${this.urlApi}api/usuario/newUsuario`,
          user,
          { observe: 'body' }
        )
        .pipe(
          map((data: boolean) => {
            return data;
          })
        );
    } */

    async addUsuario(
      user: UsuarioRegistro
      ): Promise<String> {
        return new Promise((resolve, reject) => {
          this.http
            .post<ObjectResponse<String>>(
              `${this.urlApi}api/usuario/newUsuario`,
              user,
              { observe: 'body' }
            )
            .subscribe(
              (response: ObjectResponse<String>) => {
                this.handleResponse(response, resolve, reject);
              },
              () => {
                reject('Error al crear el usuario');
              }
            );
        });
      }
  
  }