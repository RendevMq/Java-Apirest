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
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(items);

    // Update the local state
    onReorderProducts(items);

    // Update the order in the backend
    try {
      await axios.post("/product/update-order", items);
    } catch (error) {
      console.error("Failed to update product order", error);
      // Optionally, revert the local state if the API call fails
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
