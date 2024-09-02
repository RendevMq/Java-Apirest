import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import styles from "./ProductList.module.css";

const ProductList = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onReorderProducts,
}) => {
  const handleDragEnd = async (result) => {
    // Check if there's a valid destination
    if (!result.destination) return;

    // Create a copy of the items and reorder them
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Pass the reordered items to the backend
    try {
      await updateProductOrder(
        items.map((item, index) => ({ ...item, orden: index + 1 }))
      );
      // Optionally, update the local state here if needed
    } catch (error) {
      console.error("Failed to update product order:", error);
      // Handle error if necessary
    }
  };

  console.log("Products:", products);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.list}
          >
            {products.map((product, index) => (
              <Draggable
                key={product.id}
                draggableId={product.id.toString()} // Ensure this ID is unique
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={styles.item}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className={styles.dragHandle}
                    >
                      <GripVertical size={20} />
                    </div>
                    <span className={styles.productName}>{product.nombre}</span>
                    <span className={styles.productPrice}>
                      ${product.precio.toFixed(2)}
                    </span>
                    <div className={styles.actions}>
                      <button
                        onClick={() => onEditProduct(product)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}{" "}
            {/* Placeholder is required to maintain layout */}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductList;
