import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export const BaseViteConfig = defineConfig({
  plugins: [eslint()],
});
