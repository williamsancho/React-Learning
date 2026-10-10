export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export type ProductInput = Omit<Product, "productId">;