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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

const PORTA = process.env.PORT || 3002;
app.listen(PORTA, () => {
  console.log(`Adonai - backend rodando na porta ${PORTA}`);
});
