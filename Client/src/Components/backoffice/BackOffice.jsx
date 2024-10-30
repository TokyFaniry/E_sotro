// src/Components/BackOffice.jsx
import React, { useEffect, useState } from 'react';
import UserSection from './UserSection';
import StockSection from './StockSection';
import OrderSection from './OrderSection';
import AnalyticsChart from './AnalyticsChart';
import Sidebar from './sidebar'; 
import '../../App.css'

function BackOffice() {
  const [salesData, setSalesData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('users'); // État pour suivre la section sélectionnée

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/sales');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de vente');
        }
        const data = await response.json();
        console.log('Données de vente récupérées:', data); // Debugging
        setSalesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalesData();
  }, []);

  // Fonction pour rendre le contenu en fonction de la section sélectionnée
  const renderContent = () => {
    switch (selectedSection) {
      case 'users':
        return <UserSection />;
      case 'stock':
        return <StockSection />;
      case 'orders':
        return <OrderSection />;
      case 'analytics':
        return <AnalyticsChart data={salesData} title="Analyse des Ventes" />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <h1>Tableau de bord Back-Office</h1>
      <div className="dashboard-content">
        <Sidebar onSelect={setSelectedSection} /> 
        <div className="main-content">
          {renderContent()}
          {selectedSection === 'analytics' && salesData.length === 0 && (
            <p>Aucune donnée de vente disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BackOffice;
