import React, { useState, useEffect } from 'react';

const StockSection = () => {
  const [product, setProduct] = useState({
    name: '',
    image: null,
    country: '',
    category: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [products, setProducts] = useState([]); // Liste des produits
  const [editingProduct, setEditingProduct] = useState(null); // Produit en cours de modification

  // Fonction pour récupérer la liste des produits
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8082/api/products');
    const data = await response.json();
    setProducts(data); // Stocker la liste des produits
  };

  // Charger les produits au chargement du composant
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    const url = editingProduct 
      ? `http://localhost:8082/api/products/${editingProduct.id}`
      : 'http://localhost:8082/api/products';

    const method = editingProduct ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: formData
    });

    if (response.ok) {
      fetchProducts(); // Actualiser la liste après ajout/modification
      setProduct({ name: '', image: null, country: '', category: '', description: '', price: '', quantity: '' });
      setEditingProduct(null); // Réinitialiser l'état d'édition
    } else {
      const errorData = await response.json();
      alert(`Erreur : ${errorData.error}`);
    }
  };

  const handleEdit = product => {
    setEditingProduct(product);
    setProduct({
      name: product.name,
      image: null, 
      country: product.country,
      category: product.category,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    });
  };

  const handleDelete = async id => {
    const response = await fetch(`http://localhost:8082/api/products/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchProducts(); 
    }
  };

  return (
    <div className="stock-section">
      <h2>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={product.name} placeholder="Nom du produit" onChange={handleChange} />
        {product.image && (
          <img
            src={URL.createObjectURL(product.image)}
            alt="Aperçu"
            style={{ width: '100px' }}
          />
        )}
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        <select name="country" value={product.country} onChange={handleChange}>
          <option value="">Sélectionnez un pays</option>
          <option value="Germany">Allemagne</option>
          <option value="France">France</option>
          <option value="US">États-Unis</option>
        </select>
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="">Sélectionnez une catégorie</option>
          <option value="Whisky">Whisky</option>
          <option value="Rhum">Rhum</option>
          <option value="Autres">Autres</option>
        </select>
        <input name="description" value={product.description} placeholder="Description" onChange={handleChange} />
        <input name="price" value={product.price} placeholder="Prix" type="number" onChange={handleChange} />
        <input name="quantity" value={product.quantity} placeholder="Quantité" type="number" onChange={handleChange} />
        <button type="submit">{editingProduct ? 'Modifier Produit' : 'Ajouter Produit'}</button>
      </form>

      <h2>Liste des produits</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Pays</th>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.country}</td>
              <td>{prod.category}</td>
              <td>{prod.description}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Modifier</button>
                <button onClick={() => handleDelete(prod.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockSection;
