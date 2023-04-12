import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService, ObjectResponse } from "src/core/base/services/backend-service";
import { environment } from 'src/environments/environment';
import { Pais } from "../models/pais-model";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MasterdataService extends BackendService {
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

  async getPaises(
  ): Promise<Array<Pais>> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ObjectResponse<Array<Pais>>>(
          `${this.urlApi}api/masterData/allPaises`,
          { observe: 'body' }
        )
        .subscribe(
          (response: ObjectResponse<Array<Pais>>) => {
            this.handleResponse(response, resolve, reject);
          },
          () => {
            reject('Error al recuperar el listado de paises');
          }
        );
    });
  }

}