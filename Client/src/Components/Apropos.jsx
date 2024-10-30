import React, { useState } from 'react';


const Apropos = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "À Propos de Nos Boissons",
      content:
        "Bienvenue sur notre site de vente de whisky, rhum et autres boissons, où nous vous proposons une sélection des meilleures boissons du monde. Que vous soyez un amateur ou un novice, nous avons quelque chose pour vous !"
    },
    {
      title: "Notre Histoire",
      content:
        "Fondée en 2023, notre entreprise est née de la passion pour les spiritueux. Nous croyons que chaque bouteille raconte une histoire et que chaque gorgée est une expérience unique. Nos experts en boissons sélectionnent soigneusement chaque produit pour vous offrir les meilleures options."
    },
    {
      title: "Notre Mission",
      content:
        "Notre mission est de partager notre amour pour les spiritueux avec le monde. Nous nous engageons à fournir des produits de haute qualité à des prix compétitifs, tout en garantissant une expérience client exceptionnelle."
    },
    {
      title: "Contactez-Nous",
      content:
        "N'hésitez pas à nous contacter pour toute question ou pour des conseils sur le choix de votre prochaine boisson. Nous sommes là pour vous aider !"
    }
  ];

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-container">
      <div className="carousel-slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <h1>{slide.title}</h1>
            <p>{slide.content}</p>
          </div>
        ))}
      </div>
      <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Apropos;
