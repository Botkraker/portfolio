import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Deployed to GitHub Pages at /<repo>/. Set BASE=/ for a custom domain.
export default defineConfig({
  base: process.env.BASE ?? "/portfolio/",
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Animation libraries change far less often than the site itself,
        // so give them their own long-cached chunks.
        manualChunks: {
          motion: ["motion", "motion/react"],
          gsap: ["gsap", "gsap/ScrollTrigger", "lenis"],
          react: ["react", "react-dom", "react-dom/client"],
        },
      },
    },
  },
});
