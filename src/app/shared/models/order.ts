import { Product } from "./product";

export class Order {
  id!: number;
  numero: number;
  dataCompra: Date;
  total: number;
  name: string;
  produtos?: Product[]
};
