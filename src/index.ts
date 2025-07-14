import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator";
import { DataError } from "./errors/DataErrors";
import { NetworkError } from "./errors/NetworError";

fetchProductCatalog()
  .then((products) => {
    console.log("Products:");
    products.forEach((p) => console.log(`${p.name} - $${p.price}`));

    const reviewPromises = products.map((product) =>
      fetchProductReviews(product.id)
        .then((reviews) => {
          console.log(`\nReviews for ${product.name}:`);
          reviews.forEach((review) => {
            console.log(`- ${review.rating} stars: ${review.comment}`);
          });
        })
        .catch((err) => {
          if (err instanceof DataError) {
            console.error("Data Error:", err.message);
          } else if (err instanceof NetworkError) {
            console.error("Network Error:", err.message);
          } else {
            console.error("Unknown Error:", err);
          }
        })
    );

    return Promise.all(reviewPromises);
  })
  .then(() => {
    return fetchSalesReport()
      .then((report) => {
        console.log("\nSales Report:");
        console.log(`Total Sales: $${report.totalSales}`);
        console.log(`Units Sold: ${report.unitsSold}`);
        console.log(`Average Price: $${report.averagePrice}`);
      })
      .catch((err) => {
         if (err instanceof DataError) {
            console.error("Data Error:", err.message);
          } else if (err instanceof NetworkError) {
            console.error("Network Error:", err.message);
          } else {
            console.error("Unknown Error:", err);
          }
      });
  })
  .finally(() => {
    console.log("\nAll API requests were attempted.");
  });
