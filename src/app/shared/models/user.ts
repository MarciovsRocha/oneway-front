export class User  {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  servico?: string;

  constructor(nome: string, email: string, senha: string, servico?: string){
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.servico = servico;
  }
};
