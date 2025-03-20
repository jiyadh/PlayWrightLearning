import { test, expect } from "@playwright/test";

// Test for GET /products
test("GET /products", async ({ request }) => {
  const apiURL = "https://api.practicesoftwaretesting.com/";

  const response = await request.get(apiURL + "products");
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  // console.log(responseBody);

  expect(responseBody.data).toHaveLength(9);
  expect(responseBody.total).toBe(50);
});

// Test for POST /users/login
test("POST /users/login", async ({ request }) => {
  const apiURL = "https://api.practicesoftwaretesting.com";

  const response = await request.post(apiURL + "/users/login", {
    data: { "email": "customer@practicesoftwaretesting.com", "password": "welcome01" },
  });
  expect(response.status()).toBe(200);
  // console.log(response.body);

  const body = await response.json();
  expect(body.access_token).toBeTruthy();
});

// Test suite for Product APIs
test.describe("Product APIs", () => {
  test("GET Products", async ({ request }) => {
    const apiURL = "https://api.practicesoftwaretesting.com/products";

    const getAllProductResponse = await request.get(apiURL + "/search?q=thor%20hammer");
    const responseBody = await getAllProductResponse.json();

    const productId = responseBody.data[0].id;
    console.log(productId);

    const response = await request.get(apiURL + "/" + productId);
  });
});