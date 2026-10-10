import {createContext, useCallback, useEffect, useMemo, useState, type ReactNode,} from "react";
import initialProductsJson from "../assets/products.json";
import type { Product, ProductInput } from "../model/product";
import {
  loadProducts,
} from "../services/productStorage";

interface ProductContextValue {
  products: Product[];
  findProduct: (id: number) => Product | undefined;
  addProduct: (product: Product) => boolean;
  updateProduct: (
    id: number,
    changes: ProductInput
  ) => boolean;
  deleteProduct: (id: number) => boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext =
  createContext<ProductContextValue | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({
  
  children,
}: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(() =>
    loadProducts(initialProductsJson as unknown as Product[])
  );

  useEffect(() => {
  }, [products]);

  const findProduct = useCallback(
    (productId: number): Product | undefined => {
      const normalizedId = productId;

      return products.find(
        (product) =>
          product.id === normalizedId
      );
    },
    [products]
  );

  const addProduct = useCallback(
    (product: Product): boolean => {
      const normalizedId = product.id;
      let added = false;

      setProducts((currentProducts) => {
        const alreadyExists = currentProducts.some(
          (currentProduct) =>
            currentProduct.id === normalizedId
        );

        if (alreadyExists) {
          return currentProducts;
        }

        added = true;

        return [
          ...currentProducts,
          {
            ...product,
            productId: product.id,
            name: product.name.trim(),
            category: product.category.trim(),
          },
        ];
      });

      return added;
    },
    []
  );

  const updateProduct = useCallback(
    (
      productId: number,
      changes: ProductInput
    ): boolean => {
      const normalizedId = productId;
      let updated = false;

      setProducts((currentProducts) =>
        currentProducts.map((product) => {
          if (product.id !== normalizedId) {
            return product;
          }

          updated = true;

          return {
            ...product,
            name: changes.name.trim(),
            price: changes.price,
            category: changes.category.trim(),
          };
        })
      );

      return updated;
    },
    []
  );

  const deleteProduct = useCallback(
    (productId: number): boolean => {
      const normalizedId = productId;
      let deleted = false;

      setProducts((currentProducts) => {
        const filteredProducts = currentProducts.filter((product) => {
          const matches =
            product.id === normalizedId;

          if (matches) {
            deleted = true;
          }

          return !matches;
        });

        return filteredProducts;
      });

      return deleted;
    },
    []
  );

  const value = useMemo(
    () => ({
      products,
      findProduct,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      findProduct,
      addProduct,
      updateProduct,
      deleteProduct,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
