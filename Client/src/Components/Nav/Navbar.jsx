import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineShop, AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { RiMenu3Line } from 'react-icons/ri';
import { FilterContext } from '../Nav/FilterProvider'; 
import { CartContext } from '../Nav/CartContext'; 
import { FaSearch, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const { handleFilter, activeFilter,filteredData } = useContext(FilterContext);
  const { cartItems, removeFromCart, getTotalPrice, updateQuantity } = useContext(CartContext);
  const [selected, setSelected] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false); 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [searchText, setSearchText] = useState(''); 
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userName') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Connexion réussie !');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        setUserName(localStorage.setItem('userName', userEmail));
        localStorage.setItem('userName', loginEmail)
        setUserEmail(loginEmail);
        closeForm();
      } else {
        alert(data.error || 'Erreur lors de la connexion');
      }
    } catch (error) {
      alert('Erreur lors de la connexion: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const response = await fetch('http://localhost:8082/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: signupUsername, email: signupEmail, password: signupPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const loginResponse = await fetch('http://localhost:8082/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        alert('Inscription et connexion réussies !');
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('userName', signupEmail);
        setUserName(loginData.name);
        setUserEmail(signupEmail);
        closeForm();
      } else {
        alert(loginData.error || 'Erreur lors de la connexion après inscription');
      }

      resetSignupFields();
    } catch (error) {
      alert('Une erreur est survenue: ' + error.message);
    }
  };

  const resetSignupFields = () => {
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  const handlePayClick = async () => {
    if (!userEmail) {
      setIsFormVisible(true);
      return;
    }
  
    for (const item of cartItems) {
      try {
        // Vérification de la quantité disponible
        const checkResponse = await fetch(`http://localhost:8082/api/products/${item.id}/update-quantity`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantityOrdered: item.quantity }),
        });
  
        const checkData = await checkResponse.json();
  
        if (!checkResponse.ok) {
          alert(`Erreur: ${checkData.error} pour le produit ${item.name}. Disponible: ${checkData.availableQuantity}`);
          continue; // Passe au prochain article si la quantité n'est pas suffisante
        }
  
        // Si la quantité est suffisante, passer la commande
        const orderData = { quantity: item.quantity, product_name: item.name };
        const orderResponse = await fetch('http://localhost:8082/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(orderData),
        });
  
        if (orderResponse.ok) {
          alert(`Commande réussie pour le produit ${item.name} !`);
        } else {
          alert(`Erreur lors du passage de la commande pour ${item.name}.`);
        }
      } catch (error) {
        alert(`Une erreur est survenue pour ${item.name}: ${error.message}`);
      }
    }
  };
  
  const handleSelect = (item) => {
    setSelected(item);
    document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
    if (profileVisible) {
      setProfileVisible(false);
    }
  };

  const toggleProfileVisibility = () => {
    setProfileVisible(!profileVisible);
    if (cartVisible) {
      setCartVisible(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    handleFilter(activeFilter, e.target.value);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setLoginEmail('');
    setLoginPassword('');
    setIsSignIn(true);
  };

  const handleFormSwitch = () => {
    setIsSignIn(!isSignIn);
    setIsFormVisible(true);
    
    if (isSignIn) {
      setLoginEmail('');
      setLoginPassword('');
    } else {
      resetSignupFields();
    }
  };

  
  return (
    <div className="navbar">
      <div className="navbar-top">
        <ul id="navbar-top-menu" className={displayMenu ? 'add-class' : 'null'}>
          {['WHISKY', 'RHUM', 'AUTRES'].map((item) => (
            <li
              key={item}
              className={selected === item ? 'active' : ''}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="navbar-logo">E-SOTRO</div>
        <ul className="navbar-icons">
          <li><AiOutlineShop size={24} /></li>
          <li onClick={toggleProfileVisibility} style={{ position: 'relative' }}>
            <AiOutlineUser size={24} />
          </li>
          <li onClick={toggleCartVisibility} style={{ position: 'relative' }}>
            <AiOutlineShopping size={24} />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </li>
          <li><RiMenu3Line size={24} className="fa-menu" onClick={handleClickMenu} /></li>
        </ul>
      </div>

      {profileVisible && (
        <div className="profile-dropdown">
          {isSignIn ? (
            <>
              <p><span style={{color:'#d32f2f'}}>Email :</span> {userEmail}</p>
              <button className="btn-three" onClick={() => {setIsSignIn(false)}}>
                Déconnexion
              </button>
            </>
          ) : (
            <button className="btn-three" onClick={handleFormSwitch}>
              Se connecter
            </button>
          )}
        </div>
      )}

      {cartVisible && (
        <div className="cart-dropdown">
          {cartItems.length === 0 ? (
            <p>Votre Panier est vide.</p>
          ) : (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src={`http://localhost:8082/${item.image}`} alt={item.name} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
                    <span>{item.name} - {item.price} Ar</span>
                    <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center' }}>
                      <button className="btn-three" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <button className="btn-three" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="btn-three" onClick={() => removeFromCart(item.id)}>Supprimer</button>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                <strong>Total: {getTotalPrice()} Ar</strong>
              </div>
              <button className="pay-btn btn-three" onClick={handlePayClick}>Payer</button>
            </>
          )}
        </div>
      )}

      {isFormVisible && (
        <div className="form-overlay">
          <div className="login-wrap">
            <div className="login-html">
              <input id="tab-1" type="radio" name="tab" className="sign-in" checked={isSignIn} onChange={() => setIsSignIn(true)} />
              <label htmlFor="tab-1" className="tab">Se connecter</label>
              <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!isSignIn} onChange={() => setIsSignIn(false)} />
              <label htmlFor="tab-2" className="tab">S'enregistrer</label>
              <div className="login-form">
                {isSignIn ? (
                  <div className="sign-in-htm">
                    <div className="group">
                      <label htmlFor="login-email" className="label">Email</label>
                      <input id="login-email" required type="text" className="input" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="group">
                      <label htmlFor="login-pass" required className="label">Mot de Passe</label>
                      <input id="login-pass" type="password" className="input" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <div className="group">
                      <button type="submit" className="button" onClick={handleLogin}>Connexion</button>
                    </div>
                  </div>
                ) : (
                  <div className="sign-up-htm">
                    <div className="group">
                      <label htmlFor="signup-username" className="label">Username</label>
                      <input id="signup-username" required type="text" className="input" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                    </div>
                    <div className="group">
                      <label htmlFor="signup-email" className="label">Email</label>
                      <input id="signup-email" required type="text" className="input" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                    </div>
                    <div className="group">
                      <label htmlFor="signup-pass" className="label">Mot de Passe</label>
                      <input id="signup-pass" required type="password" className="input" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    </div>
                    <div className="group">
                      <label htmlFor="signup-confirm-pass" className="label">Confirmer Mot de Passe</label>
                      <input id="signup-confirm-pass" required type="password" className="input" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                    </div>
                    <div className="group">
                      <button type="submit" className="button" onClick={handleRegister}>S'inscrire</button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={closeForm} className="close-button"><FaTimes /></button>
            </div>
          </div>
        </div>
      )}
      
      <div className="navbar-bottom">
        <div className="navbar-bottom-menu">
          <button onClick={() => handleFilter('Tous', searchText)} className={activeFilter === 'Tous' ? 'active' : ''}>Tous</button>
          <button onClick={() => handleFilter('Germany', searchText)} className={activeFilter === 'Germany' ? 'active' : ''}>Allemagne</button>
          <button onClick={() => handleFilter('France', searchText)} className={activeFilter === 'France' ? 'active' : ''}>France</button>
          <button onClick={() => handleFilter('US', searchText)} className={activeFilter === 'Us' ? 'active' : ''}>US</button>
        </div>
        <div className="navbar-search">
  <input 
    type="text" 
    placeholder="Rechercher" 
    value={searchText} 
    onChange={handleSearchChange}
    className={displayMenu ? 'add-class-search-bar' : ''} 
  />
  <FaSearch size={17} id="fa-search" className={displayMenu ? 'add-class-search-bar-icon' : ''} />
</div>
{searchText && (
  <div className="search-results">
    {filteredData.length > 0 ? (
      <ul>
        {filteredData.map(item => (
          <li key={item.id} onClick={() => handleSelect(item.name)}>
            <img 
              src={`http://localhost:8082/${item.image}`} 
              alt={item.name} 
              style={{ width: '50px', height: 'auto', marginRight: '10px' }} 
            />
            <span>{item.name} - {item.price} Ar</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>Aucun résultat trouvé</p>
    )}
  </div>
)}
        <div className="avant-gardists">IREO TOAKA</div>
      </div>
    </div>
  );
};

export default Navbar;
