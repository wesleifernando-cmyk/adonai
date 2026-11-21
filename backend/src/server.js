import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pagamentosRoutes from "./routes/pagamentos.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import quizRoutes from "./routes/quiz.js";
import catolicoRespondeRoutes from "./routes/catolico-responde.js";
import authFacebookRoutes from "./routes/auth-facebook.js";
import leituraRoutes from "./routes/leitura.js";
import { garantirSchema, garantirSchemaConvites } from "./db/schema.js";
import convitesRoutes from "./routes/convites.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ servico: "Adonai - API", status: "online" });
});

app.use("/pagamentos", pagamentosRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/quiz", quizRoutes);
app.use("/catolico-responde", catolicoRespondeRoutes);
app.use("/auth/facebook", authFacebookRoutes);
app.use("/leitura", leituraRoutes);
app.use("/convites", convitesRoutes);

garantirSchema().catch((err) => console.error("Erro ao ajustar o banco:", err.message));
garantirSchemaConvites().catch((err) => console.error("Erro ao criar tabelas de convites:", err.message));

const PORTA = process.env.PORT || 3002;
app.listen(PORTA, () => {
  console.log(`Adonai - backend rodando na porta ${PORTA}`);
});
