import { Product } from "./product";
import { State } from "./state";

export class City  {
  id!: number;
  id_Estado?: number;
  nome?: string;
  estado?: State;
  produtos?: Product[]
};
