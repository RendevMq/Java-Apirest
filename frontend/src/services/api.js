// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = "https://javaapirestcrudrailway-production.up.railway.app";

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/product`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json(); // Los productos deberían ya estar en el orden correcto gracias a la lógica en el backend
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product with id ${id}`);
  }
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product with id ${id}`);
  }
  return response.json();
};

export const updateProductOrder = async (products) => {
  const response = await fetch(`${API_BASE_URL}/product/order`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      products.map((product) => ({
        id: product.id,
        orden: product.orden,
      }))
    ),
  });
  if (!response.ok) {
    throw new Error("Failed to update product order");
  }
  return response.json();
};
