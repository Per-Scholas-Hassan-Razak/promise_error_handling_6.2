import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator";

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
          console.log(`Could not fetch reviews for ${product.name}: ${err}`);
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
        console.log("Error fetching sales report:", err);
      });
  })
  .finally(() => {
    console.log("\nAll done.");
  });