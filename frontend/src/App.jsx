import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList from "./components/ProductList/ProductList";
import EditModal from "./components/EditModal/EditModal";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";
import "./variables.css";
import styles from "./App.module.css";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getAllProducts();
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async (product) => {
    await createProduct(product);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    await updateProduct(updatedProduct.id, updatedProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  const handleReorderProducts = (reorderedProducts) => {
    setProducts(reorderedProducts);
    // You might want to update the order in the backend here
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${styles.app} ${theme}-theme`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.main}>
        <h1 className={styles.title}>Add and Organize Your Products</h1>
        <ProductForm onAddProduct={handleAddProduct} />
        <ProductList
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onReorderProducts={handleReorderProducts}
        />
        {editingProduct && (
          <EditModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdate={handleUpdateProduct}
          />
        )}
      </main>
    </div>
  );
};

export default App;
