import { City } from "./city";
import { Country } from "./country";
import { Product } from "./product";

export class State  {
  id!: number;
  id_Pais?: number;
  nome?: string;
  pais?: Country;
  cidades?: City[]
};
