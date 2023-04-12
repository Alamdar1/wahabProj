import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService, ObjectResponse } from "src/core/base/services/backend-service";
import { environment } from 'src/environments/environment';
import { Observable, map } from "rxjs";
import { Post } from "../model/post.model";
import { FiltroPostRequest } from "../model/filtro-post-request";

@Injectable({
    providedIn: 'root',
  })
  export class PostService extends BackendService {
    private readonly urlApi: string;
    private readonly resourceUrl: string;
    
  
    constructor(private readonly http: HttpClient) {
      super();
      this.urlApi = `${environment.backendUrl}`;
      this.resourceUrl = 'api/post';

      const httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    }

    async getPostsOF(
      filtro: FiltroPostRequest
      ): Promise<Array<Post>> {
        return new Promise((resolve, reject) => {
          this.http
            .post<ObjectResponse<Array<Post>>>(
              `${this.urlApi}${this.resourceUrl}/find-all`,
              filtro,
              { observe: 'body' }
            )
            .subscribe(
              (response: ObjectResponse<Array<Post>>) => {
                this.handleResponse(response, resolve, reject);
              },
              () => {
                reject('Error al crear el usuario');
              }
            );
        });
      }
  
  }