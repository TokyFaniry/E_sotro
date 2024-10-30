import React, { useContext } from 'react';
import { CartContext } from '../Nav/CartContext';
import { FilterContext } from '../Nav/FilterProvider';
import { motion } from 'framer-motion'; 
import '../../App.css';

const Rhum = () => {
  const { filteredData } = useContext(FilterContext);
  const { addToCart } = useContext(CartContext);

  const revealVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  const rhumProducts = filteredData.filter(item => item.category === 'Rhum'); 
  return (
    <div>
      <motion.hr
        style={{ width: '40%', marginTop: '20%' }}
        initial="hidden"
        whileInView="visible"
        variants={revealVariant}
        viewport={{ amount: 0.5 }}
      />
      
      <motion.h1
        style={{ textAlign: 'center' }}
        initial="hidden"
        whileInView="visible"
        variants={revealVariant}
        viewport={{ amount: 0.5 }} 
        id='rhum'
      >
        RHUM
      </motion.h1>

      <motion.div
        className="wrapper"
        initial="hidden"
        whileInView="visible"
        variants={revealVariant}
        viewport={{ amount: 0.2 }} 
      >
        {rhumProducts.length > 0 ? (
          rhumProducts.map(item => (
            <motion.div
              className='prod'
              key={item.id}
              initial="hidden"
              whileInView="visible"
              variants={revealVariant}
              viewport={{ amount: 0.3 }}
            >
              <div className="product-img">
                <img src={`http://localhost:8082/${item.image}`} height="420" width="430" alt={item.name} />
              </div>
              <div className="product-info">
                <div className="product-text">
                  <h1>{item.name}</h1>
                  <h2>{item.description}</h2>
                </div>
                <div className="product-price-btn">
                  <p><span>{item.price}</span> Ar</p>
                  <button type="button" className="btn-three" onClick={() => addToCart(item)}>Ajouter au panier</button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucun produit à afficher.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Rhum;
