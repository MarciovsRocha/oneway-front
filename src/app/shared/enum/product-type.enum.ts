export enum ProductType {
  Hospedagem = 1,
  Transporte = 2,
  PontosTuristicos = 3,
}

export namespace ProductType {
  export function getTypeText(type: ProductType): string {
    switch (type) {
      case ProductType.Hospedagem:
        return 'HOSPEDAGEM';
      case ProductType.Transporte:
        return 'TRANSPORTE';
      case ProductType.PontosTuristicos:
        return 'PONTOS.TURÍSTICOS';
      default:
        return 'DESCONHECIDO';
    }
  }

  export function getTypeNumber(type: String): number {
    switch (type) {
      case 'HOSPEDAGEM':
        return ProductType.Hospedagem;
      case 'TRANSPORTE':
        return ProductType.Transporte;
      case 'PONTOS.TURÍSTICOS':
        return ProductType.PontosTuristicos;
      default:
        return 0;
    }
  }

  export function getAllTypesTexts(): string[] {
    return Object.values(ProductType)
      .filter(value => typeof value === 'number') // Filtra apenas os valores numéricos
      .map(value => getTypeText(value as ProductType)); // Mapeia para os textos correspondentes
  }
}
