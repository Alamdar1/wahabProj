import { Pais } from "src/app/shared/models/pais-model";

export interface FiltroPostRequest {
    sexo: string;
    pais: Array<string>;
  }