export type Product = {
  id: number;
  title: string;
  price: number;
};

export const products = {
  iphone12: {
    id: 1,
    title: "Apple iPhone 12, 128GB, Black",
    price: 905.99
  },
  huaweiMate20: {
    id: 2,
    title: "Huawei Mate 20 Lite, 64GB, Black",
    price: 236.12
  },
  samsungA32: {
    id: 3,
    title: "Samsung Galaxy A32, 128GB, White",
    price: 286.99
  },
  iphone13: {
    id: 4,
    title: "Apple iPhone 13, 128GB, Blue",
    price: 918.99
  },
  nokia105: {
    id: 5,
    title: "Nokia 105, Black",
    price: 19.99
  }
} as const satisfies Record<string, Product>;

export function productCatalog(): Product[] {
  return [
    products.iphone12,
    products.huaweiMate20,
    products.samsungA32,
    products.iphone13,
    products.nokia105
  ];
}

export function cartTotal(items: Product[]): number {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return Math.round(total * 100) / 100;
}
