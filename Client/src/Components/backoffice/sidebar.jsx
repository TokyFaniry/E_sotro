// src/Components/Sidebar.jsx
import React from 'react';
import '../../App.css';


const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item" onClick={() => onSelect('users')}>Utilisateurs</li>
        <li className="sidebar-item" onClick={() => onSelect('stock')}>Stock</li>
        <li className="sidebar-item" onClick={() => onSelect('orders')}>Commandes</li>
        <li className="sidebar-item" onClick={() => onSelect('analytics')}>Analyse des Ventes</li>
      </ul>
    </div>
  );
};

export default Sidebar;

