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

   
}