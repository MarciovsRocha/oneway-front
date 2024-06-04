import { City } from "./city";

export class Product  {
  id!: number;
  nome?: string;
  precoMedioDiaria?: number;
  idCidade?: number;
  descricao?: string;
  idTipo?: number;
  cidade?: City;
  
  files?: File[];
  image?: string;
};
