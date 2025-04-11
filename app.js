const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración del transporte de correo (esto es un ejemplo usando Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'samuchimweb222@gmail.com',  // Tu correo
    pass: 'Samucky22'       // Tu contraseña o App Password si tienes la autenticación en 2 pasos
  }
});

// Ruta para manejar el formulario de contacto
app.post('/enviar-correo', (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const mailOptions = {
    from: 'tuemail@gmail.com',  // Tu correo de origen
    to: 'tucorreo@destino.com', // El correo donde se enviarán los mensajes
    subject: 'Nuevo mensaje de contacto',
    text: `
      Nombre: ${nombre}
      Correo: ${correo}
      Mensaje: ${mensaje}
    `
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error al enviar el correo: ' + error);
    }
    res.status(200).send('Correo enviado con éxito!');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
