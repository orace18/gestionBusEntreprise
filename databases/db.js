const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const db = mysql.createPool({
  host: 'localhost', // ou une URL de serveur distant
  user: 'root',
  password: '',
  database: 'otrip'
});

module.exports = db;
