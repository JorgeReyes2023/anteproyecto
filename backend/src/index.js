const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Route cocktail du jour
app.get("/api/", async (req, res) => {
res.json({
  message: "Bienvenue sur l'API Cocktail du jour !",
  status: "OK"
})
});

// Fonction utilitaire
app.listen(PORT, () => {
  console.log('✅ Serveur prêt');
});
