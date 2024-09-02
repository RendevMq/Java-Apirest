import React, { useState } from "react";
import styles from "./ProductForm.module.css";

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({ name: "", price: "" });

  const validateName = (name) => {
    if (name.trim().length < 4) {
      return "Name must be at least 4 characters";
    }
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // No permitir que se escriban espacios al inicio
    if (value === "" || value[0] !== " ") {
      setName(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: validateName(value),
      }));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      price: value ? "" : "Price is required",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const priceError = !price ? "Price is required" : "";

    if (!nameError && !priceError) {
      onAddProduct({ nombre: name.trim(), precio: parseFloat(price) });
      setName("");
      setPrice("");
    } else {
      setErrors({ name: nameError, price: priceError });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Product name"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div className={styles.formGroup}>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="Price"
          step="0.01"
          className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
        />
        {errors.price && <div className={styles.error}>{errors.price}</div>}
      </div>
      <button type="submit" className={styles.button}>
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
