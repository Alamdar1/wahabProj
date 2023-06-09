import { Pais } from "src/app/shared/models/pais-model";

export interface UsuarioRegistro {
    nombre?: string;
    apellido1?: string;
    apellido2?: string;
    sexo?: string;
    idPais?: number;
    email: string;
    onlyFansAccount?: string;
    fanslyAccount?: string;
  }