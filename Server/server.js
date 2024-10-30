const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors'); 
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Créer une application Express
const app = express();
const port = 8082;

// Middleware pour activer CORS
app.use(cors()); // Activez CORS pour toutes les requêtes

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '', 
  database: 'sotro' 
});

// Connectez-vous à la base de données
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Middleware de stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });  // Créer le dossier si non existant
    }
    cb(null, uploadPath);  // Sauvegarder dans le dossier 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Nommer le fichier avec un timestamp pour éviter les conflits
  }
});

// Configuration de Multer avec vérification des types de fichiers
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'));  // Vérifie si le fichier est bien une image
    }
    cb(null, true);
  }
});

// Route pour enregistrer un utilisateur
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashedPassword], 
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

// Route pour se connecter
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token, username: user.name, id: user.id }); 
  });
});

// API pour récupérer les commandes avec les noms de produits
app.get('/api/orders', (req, res) => {
  const query = `
    SELECT id, quantity, order_date, status, product_name
    FROM orders
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des commandes:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    res.json(results);
  });
});




app.post('/api/orders', (req, res) => {
  const { quantity, product_name } = req.body; // Récupère product_name depuis le corps de la requête
  const order_date = new Date();
  const status = 'confirmé';

  db.query(
    'INSERT INTO orders (product_name, quantity, order_date, status) VALUES (?, ?, ?, ?)', // Insère product_name ici
    [product_name, quantity, order_date, status],
    (err, results) => {
      if (err) {
        console.error('Erreur lors du passage de la commande:', err);
        return res.status(500).json({ error: 'Erreur de base de données', details: err.message });
      }
      res.status(201).json({ message: 'Commande passée avec succès', orderId: results.insertId });
    }
  );
});



// API pour supprimer une commande
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting order:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' }); // Gère le cas où l'ID n'existe pas
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  });
});


// API pour récupérer les produits
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// API pour ajouter un produit avec multer
app.post('/api/products', upload.single('image'), (req, res) => {
  const product = {
    name: req.body.name,
    image: `uploads/${req.file.filename}`, // Utiliser path.posix.join pour des barres obliques
    country: req.body.country,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity
  };
  

  db.query('INSERT INTO products SET ?', product, (err, results) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: results.insertId, ...product });
  });
});

// API pour supprimer un produit
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(204).send(); // Pas de contenu à renvoyer
  });
});

// Route pour récupérer les utilisateurs
app.get('/api/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
// API pour mettre à jour un produit
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const updatedProduct = {
    name: req.body.name,
    country: req.body.country,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  // Vérifie si une nouvelle image est envoyée et met à jour le chemin si nécessaire
  if (req.file) {
    updatedProduct.image = `uploads/${req.file.filename}`;
  }

  db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', id, ...updatedProduct });
  });
});


app.patch('/api/products/:id/update-quantity', (req, res) => {
  const { id } = req.params;
  const { quantityOrdered } = req.body;

  console.log(`Vérification de la quantité pour le produit ID: ${id}, quantité commandée: ${quantityOrdered}`);

  // Vérifiez que quantityOrdered est un nombre positif
  if (quantityOrdered <= 0) {
    return res.status(400).json({ error: 'La quantité doit être supérieure à zéro' });
  }

  // Récupérer le produit par ID
  db.query('SELECT quantity FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du produit:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    const product = results[0];

    console.log(`Produit trouvé: ${JSON.stringify(product)}`);

    // Vérifiez si la quantité demandée est disponible
    if (product.quantity < quantityOrdered) {
      console.log(`Quantité demandée supérieure à la quantité disponible: ${product.quantity}`);
      return res.status(400).json({ error: 'Quantité demandée supérieure à la quantité disponible', availableQuantity: product.quantity });
    }

    // Mettre à jour la quantité
    const newQuantity = product.quantity - quantityOrdered;

    db.query('UPDATE products SET quantity = ? WHERE id = ?', [newQuantity, id], (err) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de la quantité du produit:', err);
        return res.status(500).json({ error: 'Erreur de mise à jour de la quantité', details: err.message });
      }

      console.log(`Quantité mise à jour avec succès pour le produit ID: ${id}. Nouvelle quantité: ${newQuantity}`);
      res.status(200).json({ message: 'Quantité mise à jour avec succès', newQuantity });
    });
  });
});



// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ error: 'Multer error occurred during upload', details: err.message });
  } else if (err) {
    return res.status(500).json({ error: 'An error occurred', details: err.message });
  }
  next();
});

// Endpoint pour récupérer les données de vente
app.get('/api/sales', (req, res) => {
  const query = `
    SELECT product_name, SUM(quantity) AS total_sales
    FROM orders
    GROUP BY product_name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données de vente:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }

    // Transformez les résultats en format approprié pour le front-end
    const salesData = results.map(row => ({
      label: row.product_name,
      value: row.total_sales || 0
    }));

    res.json(salesData);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
