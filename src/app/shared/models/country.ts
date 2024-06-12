import { City } from "./city";
import { Product } from "./product";
import { State } from "./state";

export class Country  {
  id?: number;
  nome?: string;
  estados?: State[]
};
