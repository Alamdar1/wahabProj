import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService } from "src/core/base/services/backend-service";
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
  
    getPaises(): Observable<Pais[]> {
        return this.http
        .get<Pais[]>(
          `${this.urlApi}api/masterData/allPaises`,
          { observe: 'body' }
        )
        .pipe(
          map((data: Pais[]) => {
            return data;
          })
        );
    }
  
  }