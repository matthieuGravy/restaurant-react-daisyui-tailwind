const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("./config");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
/*
// test sans mongoose
app.post("/send-form", (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);

    // Vous pouvez ignorer la partie de sauvegarde dans la base de données
    // const contact = new Contact({ name, email, message });
    // await contact.save();

    // Envoie une réponse réussie
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
*/

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

//création du schema
// bug : le nom de la collection n'est pas pris en compte
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { collection: "itsgravyCollection" }
);

//création du modèle
const Contact = mongoose.model("Contact", contactSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Crée une instance du modèle Contact
    const contact = new Contact({ name, email, message });

    // Sauvegarde dans la base de données
    await contact.save();

    // Envoie une réponse réussie
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    // Gestion des erreurs
    if (error instanceof mongoose.Error.ValidationError) {
      // Erreurs de validation des données
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      // Violation d'index unique (par exemple, e-mail déjà existant)
      res.status(400).json({ error: "Email already exists" });
    } else {
      // Autres erreurs
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
