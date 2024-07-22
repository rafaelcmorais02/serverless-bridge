import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        envDir: './local',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            outDir: mode === 'staging' ? 'dist/stg' : 'dist/prd', // Custom output directory based on mode
        },
    };
});
