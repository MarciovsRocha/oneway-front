export enum UserType {
  Cliente = 1,
  Proprietario = 2,
  Administrador = 3,
}

export namespace UserType {
  export function getTypeText(type: UserType): string {
    switch (type) {
      case UserType.Cliente:
        return 'Cliente';
      case UserType.Proprietario:
        return 'Proprietário';
      case UserType.Administrador:
        return 'Administrador';
      default:
        return 'Desconhecido';
    }
  }

  export function getAllTypesTexts(): string[] {
    return Object.values(UserType)
      .filter(value => typeof value === 'number') // Filtra apenas os valores numéricos
      .map(value => getTypeText(value as UserType)); // Mapeia para os textos correspondentes
  }
}
