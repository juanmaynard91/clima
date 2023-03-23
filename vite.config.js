import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [vue(), terser(), cssnano()],
  base: "/clima/",
})
