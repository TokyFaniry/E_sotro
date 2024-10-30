import React, { useEffect, useState } from 'react';

const OrderSection = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Récupérer les commandes de l'API
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Ajoutez ce log pour vérifier les données
        setOrders(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    };
    
    fetchOrders();
  }, []);

  // Fonction pour supprimer une commande
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId)); // Mettre à jour l'état sans la commande supprimée
      } else {
        console.error('Failed to delete the order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="order-section">
      <h2>Commandes Arrivantes</h2>
      <table>
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Nom du Produit</th>
            <th>Quantité</th>
            <th>Date de Commande</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => deleteOrder(order.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSection;
