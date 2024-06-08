import { Product } from "./product";

export class Order {
  id!: number;
  numero: number;
  dataCompra: Date;
  total: number;
  cupom: string;
  produtos?: Product[]
};
