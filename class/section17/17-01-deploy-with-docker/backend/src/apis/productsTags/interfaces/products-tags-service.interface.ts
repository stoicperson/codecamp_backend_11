interface IProductsTagsServiceFindByNames {
  tagNames: string[];
}
interface IProductsTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
