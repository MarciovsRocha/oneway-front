export enum ProductType {
  Hospedagem = 1,
  Transporte = 2,
  PontosTuristicos = 3,
}

export namespace ProductType {
  export function getTypeText(type: ProductType): string {
    switch (type) {
      case ProductType.Hospedagem:
        return 'Hospedagem';
      case ProductType.Transporte:
        return 'Transporte';
      case ProductType.PontosTuristicos:
        return 'Pontos Turísticos';
      default:
        return 'Desconhecido';
    }
  }

  export function getAllTypesTexts(): string[] {
    return Object.values(ProductType)
      .filter(value => typeof value === 'number') // Filtra apenas os valores numéricos
      .map(value => getTypeText(value as ProductType)); // Mapeia para os textos correspondentes
  }
}
