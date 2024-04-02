import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@vault3/sdk-react",
      fileName: "vault3-sdk-react",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    outDir: "dist",
  },
});
