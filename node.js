const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const ip = 'localhost';
const port = 3000;
const fs = require('fs');

// Configuración de middleware
node.use(bodyParser.urlencoded({ extended: true }));
node.use(bodyParser.json());

// Configuración de archivos estáticos
node.use(express.static(path.join(__dirname)));

// Configuración de conexión a MySQL con un pool
let pool = mysql.createPool({
    host: "ec2-54-196-48-113.compute-1.amazonaws.com",
    database: "PaginaWeb",
    user: "admin",
    password: "admin123",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Manejo de la solicitud POST del formulario
node.post('/submit-form', (req, res) => {
    const { nombre, apellidos, celular, gmail, descripcion } = req.body;

    const query = 'INSERT INTO Contactanos (nombre, apellidos, celular, gmail, descripcion) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [nombre, apellidos, celular, gmail, descripcion], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            res.status(500).send('Ocurrió un error al procesar tu consulta.');
            return;
        }

        // Redirige a la página de confirmación o éxito
        res.redirect('/'); // Redirige a la página de inicio después de enviar el formulario
    });
});

// Página principal
node.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML'));
});

node.listen(port, () => {
    console.log(`Servidor escuchando en http://${ip}:${port}`);
});