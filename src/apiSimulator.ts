import { DataError } from "./errors/DataErrors";
import { NetworkError } from "./errors/NetworError";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductReview {
  rating: number;
  comment: string;
}

interface SalesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

export const fetchProductCatalog = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const networkError = Math.random() < 0.2;
      const isBadData = Math.random() < 0.1;

      if (isBadData) {
        reject(
          new DataError("Malformed product data: missing fields or wrong types")
        );
      }
      else if (networkError) {
        reject(new NetworkError("Failed to fetch product catalog"));
      } else {
        resolve([
          { id: 1, name: "Laptop", price: 1200 },
          { id: 2, name: "Headphones", price: 200 },
          { id: 3, name: "Smartphone", price: 800 },
        ]);
      }
    }, 1000);
  });
};

export const fetchProductReviews = (
  productId: number
): Promise<ProductReview[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const networkError = Math.random() < 0.3;
      if (networkError) {
        reject(
          new NetworkError(
            `Failed to fetch reviews for product Id ${productId}`
          )
        );
      } else {
        resolve([
          { rating: 5, comment: "Excellent product!" },
          { rating: 4, comment: "Very good, would recommend." },
          { rating: 3, comment: "It's okay, met expectations." },
        ]);
      }
    }, 1500);
  });
};

export const fetchSalesReport = (): Promise<SalesReport> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const networkError = Math.random() < 0.25;
      if (networkError) {
        reject(new NetworkError("Failed to fetch sales report"));
      } else {
        resolve({
          totalSales: 5400,
          unitsSold: 12,
          averagePrice: 450,
        });
      }
    }, 1000);
  });
};
