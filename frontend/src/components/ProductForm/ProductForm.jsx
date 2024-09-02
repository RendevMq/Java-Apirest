import React, { useState } from "react";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    price: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = name.trim() === "";
    const priceError = price.trim() === "" || isNaN(parseFloat(price));

    setErrors({
      name: nameError,
      price: priceError,
    });

    if (!nameError && !priceError) {
      onAddProduct({ name, price: parseFloat(price) });
      setName("");
      setPrice("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
        {errors.name && (
          <div className={styles.error}>
            Product name cannot be empty or start with a space.
          </div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.label}>
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          step="0.01"
          className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
        />
        {errors.price && (
          <div className={styles.error}>Price must be a valid number.</div>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
