import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./lib/auth/AuthContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// Atualização automática do app instalado: quando uma versão nova assume,
// recarrega uma vez. (Não recarrega na primeira instalação, só em trocas de versão.)
if ("serviceWorker" in navigator) {
  const jaTinhaControle = Boolean(navigator.serviceWorker.controller);
  let recarregou = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!jaTinhaControle || recarregou) return;
    recarregou = true;
    window.location.reload();
  });
  // Procura versão nova sempre que o app volta para a tela.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      navigator.serviceWorker.getRegistration().then((r) => r?.update()).catch(() => {});
    }
  });
}
