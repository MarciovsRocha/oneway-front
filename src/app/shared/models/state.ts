import { City } from "./city";
import { Country } from "./country";
import { Product } from "./product";

export class State  {
  id!: number;
  idPais?: number;
  nome?: string;
  pais?: Country;
  cidades?: City[]
};
