import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { BackendService, ObjectResponse } from "src/core/base/services/backend-service";


@Injectable()
export class AppService extends BackendService{
    private readonly urlApi: string;

    constructor(private readonly http: HttpClient){
        super ();
        this.urlApi = "http://localhost:8080/api/pais";
    }

    createPais(): Observable<String>{
        return this.http.get<String>(this.urlApi+"/test");
    }

    /* createPais2(): Promise<String>{
        return new Promise((resolve, reject)=>{
            this.http
                .get<ObjectResponse<String>>(
                    `${this.urlApi}/test`,
                    {observe: 'body'}
                )
                .subscribe(
                    (response: ObjectResponse<String>) =>{
                        this.handleResponse(response, resolve, reject);
                    },
                    ()=>{
                        reject("Se ha producido un error");
                    }
                )
        })
    }

    async getDocumentacion(
        idSoliAyuda: number
      ): Promise<String> {
        return new Promise((resolve, reject) => {
          this.http
            .get<ObjectResponse<String>>(
              `${this.urlApi}/test`,
              { observe: 'body' }
            )
            .subscribe(
              (response: ObjectResponse<String>) => {
                this.handleResponse(response, resolve, reject);
              },
              () => {
                reject('Error al recuperar el listado de documentos');
              }
            );
        });
      } */
}