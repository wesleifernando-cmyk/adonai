import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["brand/*.png"],
      devOptions: { enabled: false },
      manifest: {
        name: "Adonai",
        short_name: "Adonai",
        description: "Plataforma devocional católica do grupo de oração Adonai",
        lang: "pt-BR",
        theme_color: "#0a0a0b",
        background_color: "#0a0a0b",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/brand/adonai-mark-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/brand/adonai-mark-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/brand/adonai-mark-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 5175,
    host: true
  }
});
