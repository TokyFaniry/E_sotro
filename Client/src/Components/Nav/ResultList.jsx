import React from 'react';

// Composant qui affiche la liste filtrée
function ResultList({ filteredData }) {
  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name} - {item.category}</li>
      ))}
    </ul>
  );
}

export default ResultList;
