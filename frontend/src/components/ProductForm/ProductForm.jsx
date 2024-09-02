import React, { useState } from "react";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      onAddProduct({ nombre: name, precio: parseFloat(price) });
      setName("");
      setPrice("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        className={styles.input}
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        step="0.01"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
