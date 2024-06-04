import { City } from "./city";

export class Product  {
  id!: number;
  nome?: string;
  precoMedioDiaria?: number;
  idCidade?: number;
  descricao?: string;
  id_Tipo?: number;
  cidade?: City;
  
  files?: File[];
  image?: string;
};
