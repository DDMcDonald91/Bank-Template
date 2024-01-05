import React, { createContext, useContext, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // add items to order sheet for delivery
  const addToOrder = (product, chosenOption) => {
    setLoading(true);

    // Create a new order item with the product details and chosen option
    const orderItem = {
      name: product.name,
      price: chosenOption.price,
      option: chosenOption.size,
      // You can include other product details if needed
    };

    // Use functional update to ensure you're working with the latest state
    setOrders((prevOrders) => [...prevOrders, orderItem]);

    console.log(orders);

    setLoading(false);
  };

  // delete items from order sheet for delivery
  const deleteFromOrder = (index) => {
    setLoading(true);

    // Use functional update to ensure you're working with the latest state
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders.splice(index, 1);
      return updatedOrders;
    });

    setLoading(false);
  };

  // clear an entire order sheet for delivery
  const clearOrder = () => {
    setLoading(true);

    // Use functional update to ensure you're working with the latest state
    setOrders([]);

    console.log(orders);

    setLoading(false);
  };


// Function to delete a product by document ID
const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    console.log(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting product:', error.message);
  }
};


  return (
    <OrdersContext.Provider
      value={{ orders, setOrders, loading, setLoading, addToOrder, deleteFromOrder, clearOrder, deleteProduct }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
