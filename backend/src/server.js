import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pagamentosRoutes from "./routes/pagamentos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ servico: "Adonai - API", status: "online" });
});

app.use("/pagamentos", pagamentosRoutes);

const PORTA = process.env.PORT || 3002;
app.listen(PORTA, () => {
  console.log(`Adonai - backend rodando na porta ${PORTA}`);
});
