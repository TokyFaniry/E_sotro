import React from 'react';
import "../../App.css";
import { motion } from 'framer-motion'; 
import Typewriter from './Typewriter';

const Carousel = () => {

  const textVariant = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2.5, ease: 'easeInOut' },
    },
  };

  return (
    <>
      <div className='banniere'>
        <motion.section
          className='left'
          initial="hidden"
          whileInView="visible"
          variants={textVariant}
          viewport={{ amount: 0.5 }} 
        >
          <Typewriter text="Découvrez les Trésors du Whisky et du Rhum" />
          <p>Plongez dans l'univers raffiné des spiritueux d'exception. Nous vous offrons une sélection unique de whiskies et rhums provenant des distilleries les plus prestigieuses du monde. Que vous soyez amateur ou connaisseur, explorez des saveurs riches, des arômes captivants et des millésimes rares pour des moments de dégustation inoubliables. Profitez de nos offres exclusives et laissez-vous guider vers votre prochain coup de cœur.

          Livraison rapide et emballage soigné, pour savourer vos spiritueux en toute sérénité.
          </p>
          <div>
            <button className='btn'>Découvrir</button>
          </div>
        </motion.section>

        <motion.section
          className='right'
          initial="hidden"
          whileInView="visible"
          variants={imageVariant}
          viewport={{ amount: 0.5 }} 
        >
          <div className="container">
            <div>
              <div className="content">
                <h2>Ballentines</h2>
              </div>
            </div>
            <div>
              <div className="content">
                <h2>Glenfiddich</h2>
              </div>
            </div>
            <div>
              <div className="content">
                <h2>Red Label</h2>
              </div>
            </div>
            <div>
              <div className="content">
                <h2>Gallantry Whiskey</h2>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Carousel;
