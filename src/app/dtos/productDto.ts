export class ProductDto {
  public id!: String;
  public name!: String;
  public description!: String;
  public categoryId!: String;
  public supplierId!: String;
}

export class ProductDtoReturn extends ProductDto {
  public categoryName!: String;
  public supplierName!: String;
}
