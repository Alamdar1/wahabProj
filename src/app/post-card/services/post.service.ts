import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendService, ObjectResponse } from "src/core/base/services/backend-service";
import { environment } from 'src/environments/environment';
import { Observable, map } from "rxjs";
import { Post } from "../model/post.model";
import { FiltroPostRequest } from "../model/filtro-post-request";
import { CreacionPost } from "src/app/creacion-post/models/creacion-post.model";
import { CreacionHistoricoRequest } from "../model/creacion-hist-request";

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

  async addPost(
    post: CreacionPost,
    img: File
  ): Promise<String> {
    let formData = new FormData;
    formData.append("archivo", img);
    formData.append("descripcion", post.descripcion);
    formData.append("idPerfil", post.idPerfil.toString());
    return new Promise((resolve, reject) => {
      this.http
        .post<ObjectResponse<String>>(
          `${this.urlApi}${this.resourceUrl}/upload`, formData
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

  async getPostsByIdPerfil(
    idPerfil: number
  ): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ObjectResponse<Post>>(
          `${this.urlApi}${this.resourceUrl}/get-post/${idPerfil}`,
          { observe: 'body' }
        )
        .subscribe(
          (response: ObjectResponse<Post>) => {
            this.handleResponse(response, resolve, reject);
          },
          () => {
            reject('Error al crear el usuario');
          }
        );
    });
  }

  async createHistorico(
    request: CreacionHistoricoRequest
    ): Promise<String> {
      return new Promise((resolve, reject) => {
        this.http
          .post<ObjectResponse<String>>(
            `${this.urlApi}${this.resourceUrl}/add/record`,
            request,
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