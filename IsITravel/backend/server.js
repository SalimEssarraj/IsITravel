const mongoose = require("mongoose")
const express = require("express")
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const jwt = require('jsonwebtoken');
const UserModel = require("./models/mongoschema")


const app = express()

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true
}));

const PORT = 3000
let codiceVerificaGenerato;

const  dbURL = "mongodb+srv://essarrajsalimstudente:tFj3Mguu83ViQzoD@cluster0.lkocq0b.mongodb.net/Utenti?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(dbURL).then(() => {
    console.log("Connesso al Database");
}).catch((e) => {
    console.log("Errore nella connessione al Database: ", e);
});


app.use(express.json());


const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'IsITravel@outlook.it',
    pass: process.env.pass_email
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token mancante. Effettua l\'accesso per continuare.' });

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token non valido.' });
    req.userId = decoded.userId;
    next();
  });
};


function generaCodiceVerifica() {
  codiceVerificaGenerato = Math.floor(100000 + Math.random() * 900000);
  return codiceVerificaGenerato;
}

async function inviaEmailVerifica(destinatario, codiceVerifica) {
  try {
    const mailOptions = {
      from: 'IsITravel@outlook.it',
      to: destinatario,
      subject: 'Codice di verifica',
      text: `Il tuo codice di verifica è: ${codiceVerifica}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Email di verifica inviata con successo.');
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email di verifica:', error);
    throw error;
  }
}

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato. Controlla le credenziali e riprova." });
    }

    if(password === user.password){
      passwordMatch = true;
    }else{
      passwordMatch = false;
    }

    console.log("CIAO SONO IL PASSWORDMATCH: " + passwordMatch)

    
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenziali non valide. Controlla le credenziali e riprova." });
    }

    const token = jwt.sign({
      userId: user._id,
      username: user.username,
      email: user.email
    }, process.env.secret, { expiresIn: '4h' });



    res.status(200).json({ message: "Accesso effettuato con successo.", token: token });
  } catch (error) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il login." });
  }
});

app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout effettuato con successo." });
});

app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: "Email già registrata. Prova ad accedere o utilizzare un'altra email." });
    }

    
    const codiceVerificaGenerato = generaCodiceVerifica();

    await inviaEmailVerifica(email, codiceVerificaGenerato);

    res.status(200).json({ message: "Codice di verifica inviato all'utente. Controlla la posta gmail" });
  } catch (error) {
    console.error("Errore durante la registrazione dell'utente:", error);
    res.status(500).json({ error: "Si è verificato un errore durante la registrazione dell'utente." });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { email, codice, username, password } = req.body;

    if (parseInt(codice) === codiceVerificaGenerato) {

      const newUser = new UserModel({
        email,
        password,
        username,
      });
      
      const savedUser = await newUser.save();

      res.status(200).json({ message: "Codice di verifica corretto. Utente attivato." });
    } else {
      res.status(400).json({ error: "Codice di verifica non valido." });
    }
  } catch (error) {
    console.error("Errore durante la verifica del codice di verifica:", error);
    res.status(500).json({ error: "Si è verificato un errore durante la verifica del codice di verifica." });
  }
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
