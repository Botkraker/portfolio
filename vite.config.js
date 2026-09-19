import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from the domain root on Cloudflare. The GitHub Pages workflow sets
// BASE=/portfolio/ because Pages serves the site under the repo name.
export default defineConfig({
  base: process.env.BASE ?? "/",
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
