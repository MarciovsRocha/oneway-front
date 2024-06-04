import { Product } from "./product";
import { State } from "./state";

export class City  {
  id!: number;
  idEstado?: number;
  nome?: string;
  estado?: State;
  produtos?: Product[]
};
