import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilterProvider from './Components/Nav/FilterProvider'; 
import Navbar from './Components/Nav/Navbar';
import Carousel from './Components/Nav/Caroussel'; 
import Whisky from './Components/Produit/Whisky';
import Rhum from './Components/Produit/Rhum';
import Autres from './Components/Produit/Autres';
import CartProvider from './Components/Nav/CartContext';
import Footer from './Components/Footer';
import BackOffice from './Components/backoffice/BackOffice'; // Ton composant BackOffice
import Apropos from './Components/Apropos';

function App() {
  return (
    <Router>
      <CartProvider> 
        <FilterProvider>
          <Routes>
            {/* Route pour le BackOffice */}
            <Route path="/backoffice" element={<BackOffice />} />
            
            {/* Autres routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Carousel />
                <Whisky />
                <Rhum />
                <Autres />
                <Apropos/>
                <Footer />
              </>
            } />
          </Routes>
        </FilterProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
