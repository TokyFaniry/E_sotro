import React from 'react'
import {FaFacebook,FaInstagram,FaLinkedin} from 'react-icons/fa';
import Copyright from './Copyright';
import '../App.css'

function Footer() {
  return (
      <footer>
      <nav className='footer'>
        <p className='titre'> <span id='logo'>E-sotro </span> <br />
        </p>
        <p className='nav'><span> Navigations </span>
        
          <ul>
            <li><a href="">Accueil</a> </li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">A propos</a></li>
            <li><a href="#">Produits</a> </li>
            
          </ul>
          
        </p>
        <p className='produit'> <span>Nos produits </span>
          <ul>
            <li> <a href="#">Rhum </a></li>
            <li><a href="#"> Whisky</a></li>
            <li><a href="#">Autres</a></li>
          </ul>
        </p>
        <p className='reseau'> <span>Réseau</span>
          <ul>
            <li><a href="https://www.facebook.com/"><FaFacebook size="30"/></a></li>
            <li><a href="https://www.instagram.com/"><FaInstagram size="30"/></a></li>
            <li><a href="https://www.linkedin.com/"><FaLinkedin size="30"/></a></li>
          </ul>
          
          
        </p>
        
      </nav>
      <nav className='copy'>
        <Copyright />
      </nav>
    </footer>
  )
}

export default Footer


