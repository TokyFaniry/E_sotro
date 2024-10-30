import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [originalData, setOriginalData] = useState([]); // Données d'origine
  const [filteredData, setFilteredData] = useState([]); // Données filtrées
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/products');
        setOriginalData(response.data);  // Conserver les données originales
        setFilteredData(response.data);  // Initialiser filteredData
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (category, searchText = '') => {
    console.log('Filtre actif:', category);
    console.log('Texte de recherche:', searchText);
    
    let filtered = originalData; // Utiliser les données d'origine pour chaque filtre

    if (category !== 'Tous') {
      filtered = filtered.filter(item => item.country === category);
      console.log('Données après filtre de pays:', filtered);
    }

    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log('Données après filtre de recherche:', filtered);
    }

    setFilteredData(filtered);
    setActiveFilter(category);
  };

  return (
    <FilterContext.Provider value={{ filteredData, handleFilter, activeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider