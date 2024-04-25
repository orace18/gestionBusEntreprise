const http = require('http');
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv'); 
dotenv.config(); 
const routes = require('./routers/routes');
const dbConfig = require('./databases/dbConfig');
const directeurRoutes = require('./routers/directeurAgenceRoutes');
const ligneRoutes = require('./routers/lignesRoutes');
const agenceRoutes = require('./routers/agenceRoutes');
const busRoutes = require('./routers/busRoutes');
const ticketRoutes = require('./routers/ticketRoutes');
const conducteurRoutes = require('./routers/conducteurRoutes');


const app = express();
const port = process.env.PORT || 7878; 
const hostname = process.env.HOSTNAME || '192.168.0.109'; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/directeurs', directeurRoutes);
app.use('/api/lignes', ligneRoutes);
app.use('/api/agences', agenceRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/conducteurs', conducteurRoutes);


const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  createTables();
});



app.use('/', routes);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



function createTables() {
    const sqlDirecteurAgence = `
    CREATE TABLE IF NOT EXISTS DirecteurAgence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        tel VARCHAR(20),
        typediplome VARCHAR(100)
    );`;

    const sqlAgence = `
    CREATE TABLE IF NOT EXISTS Agence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(100),
        siege VARCHAR(255),
        tel VARCHAR(20),
        idDirecteur INT,
        FOREIGN KEY (idDirecteur) REFERENCES DirecteurAgence(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
    );`;

    const sqlLigne = `
    CREATE TABLE IF NOT EXISTS Ligne (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nomdelaligne VARCHAR(255) NOT NULL,
        depart VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        heuredepart TIME NOT NULL,
        heuredestination TIME NOT NULL,
        nombresescales INT DEFAULT 0,
        lieuescales TEXT
    );`;

    const sqlConducteur = `
        CREATE TABLE IF NOT EXISTS Conducteur (
            id INT AUTO_INCREMENT PRIMARY KEY,
            matricule VARCHAR(255) NOT NULL,
            nom VARCHAR(255) NOT NULL,
            prenom VARCHAR(255) NOT NULL,
            tel VARCHAR(20),
            typedepermis VARCHAR(50)
        );`;
    
    const sqlBus = `
        CREATE TABLE IF NOT EXISTS Bus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            immatriculation VARCHAR(255) NOT NULL,
            nombrederoue INT,
            nombredeplace INT,
            couleur VARCHAR(50),
            etat VARCHAR(100),
            idligne INT,
            heuredepart TIME,
            heuredestination TIME,
            datedepart DATE,
            datedestination DATE,
            type VARCHAR(100),
            idconducteur INT,
            FOREIGN KEY (idligne) REFERENCES Ligne(id),
            FOREIGN KEY (idconducteur) REFERENCES Conducteur(id)
        );`;
    
    const sqlTicket = `
        CREATE TABLE IF NOT EXISTS Ticket (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type VARCHAR(100),
            nomvoyeur VARCHAR(255),
            dateachat DATE,
            datevoyage DATE,
            lieudepart VARCHAR(255),
            lieudestination VARCHAR(255),
            heuredepart TIME,
            idAgence INT,
            idligne INT,
            heuredestination TIME,
            FOREIGN KEY (idAgence) REFERENCES Agence(id),
            FOREIGN KEY (idligne) REFERENCES Ligne(id)
        );`;
    

    // Exécution des requêtes de création de table
    connection.query(sqlDirecteurAgence, (err, result) => {
        if (err) throw err;
        console.log("Table DirecteurAgence créée ou déjà existante.");
    });
    connection.query(sqlAgence, (err, result) => {
        if (err) throw err;
        console.log("Table Agence créée ou déjà existante.");
    });
    connection.query(sqlLigne, (err, result) => {
        if (err) throw err;
        console.log("Table Ligne créée ou déjà existante.");
    });
    connection.query(sqlConducteur, (err, result) => {
        if (err) throw err;
        console.log("Table Conducteur créée ou déjà existante.");
    });
    connection.query(sqlBus, (err, result) => {
        if (err) throw err;
        console.log("Table Bus créée ou déjà existante.");
    });
    connection.query(sqlTicket, (err, result) => {
        if (err) throw err;
        console.log("Table Ticket créée ou déjà existante.");
    });
}

// Fermeture de la connexion après un timeout
setTimeout(() => {
    connection.end();
}, 5000);
