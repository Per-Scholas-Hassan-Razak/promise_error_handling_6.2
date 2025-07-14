# Lab 6.2: Promises and Error Handling

##  Description
This is a simulated e-commerce dashboard built as part of a JavaScript lab exercise focused on:
- Promise chaining
- Error handling
- Custom error classes

The application mimics real-world API calls to:
- Fetch a product catalog
- Fetch user reviews for each product
- Fetch a sales report

Each API call is designed to occasionally fail (network or data error) to test error resilience.

---

## Objectives Demonstrated

-  Use of Promises to manage asynchronous operations
-  Chaining Promises for sequential logic
-  Using `.catch()` and `.finally()` for error handling and cleanup
-  Creating and using custom error classes: `NetworkError` and `DataError`
-  Simulating real-world API delays and unpredictable failures

---


##  How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Per-Scholas-Hassan-Razak/promise_error_handling_6.2.git
   cd promise_error_handling_6.2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. run the start script
   ```bash
   npm run start
   ```

## Critical Thinking Questions

1. Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?

If you only handle errors at the end, a single failure (like one review fetch) could cause the entire chain to break. By catching errors individually, the app can still show partial data and give the user a better experience.

⸻

2. How does using custom error classes improve debugging and error identification?

Custom error classes like NetworkError and DataError help categorize the problem. Instead of just getting a generic message, you can programmatically identify the cause and take targeted action (e.g., retry a network call but not a malformed data response).

⸻

3. When might a retry mechanism be more effective than an immediate failure response?

Retrying is useful for temporary issues — such as network flakiness or a slow server. If a call fails due to a timeout, retrying 2–3 times can recover without bothering the user. But for DataErrors, retries won’t help because the problem is in the content, not the connection.

