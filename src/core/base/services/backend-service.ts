import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Respuesta = ObjectResponse<any>;
export interface ObjectResponse<T> {
  error: string;
  message: T;
  success: boolean;
}

export interface ListResponse<T> {
  error: string;
  message: PaginatedResponse<T>;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: Array<T>;
  paginacion: Paginacion;
}

export interface Paginacion {
  paginas: number;
  total: number;
  itemsPerPage: number;
}

@Injectable()
export class BackendService {
  handleResponse<T>(
    response: ObjectResponse<T>,
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  ): void;

  handleResponse<T>(
    response: ListResponse<T>,
    resolve: (
      value?: PaginatedResponse<T> | PromiseLike<PaginatedResponse<T>>
    ) => void,
    reject: (reason?: any) => void
  ): void;

  handleResponse<T>(
    response: ListResponse<T> | ObjectResponse<T>,
    resolve: (value?: any) => void,
    reject: (reason?: any) => void
  ): void {
    if (!!response.success) {
      resolve(response.message);
    } else {
      reject(response.error);
    }
  }

  handleError(
    error: HttpErrorResponse,
    resolve: (value?: any) => void,
    reject: (reason?: any) => void
  ): void {
    if (error.status === 0) {
      reject('No hay conexión con el servidor');
    } else if (error.status === 500 || error.status === 404) {
      reject('Ha ocurrido un error en la llamada');
    } else if (error.message !== '') {
      reject(error.message);
    } else if (error.status === 403) {
      reject('No estás autorizado a acceder a este recurso');
    } else {
      reject('Ha ocurrido un error');
    }
  }

  handleResponseToNumber(
    response: ObjectResponse<string>,
    resolve: (value?: number) => void,
    reject: (reason?: any) => void
  ): void {
    if (!!response.success) {
      resolve(Number(response.message));
    } else {
      reject(response.error);
    }
  }
}
