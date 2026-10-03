import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` makes a normal website in dist/. `npm run build:single` makes one self-contained HTML file in dist-single/.
// base './' lets the site run from any address or sub-folder.
export default defineConfig(({ mode }) => ({ base: './', plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])] }));
