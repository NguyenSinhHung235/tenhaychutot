import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { generatePureVietnameseNamesWithGemini, analyzeCustomNameWithGemini } from './server/geminiService';

dotenv.config();

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-endpoints',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Helper to parse JSON body
        const readBody = async (): Promise<any> => {
          return new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
            });
            req.on('end', () => {
              try {
                resolve(data ? JSON.parse(data) : {});
              } catch {
                resolve({});
              }
            });
          });
        };

        res.setHeader('Content-Type', 'application/json');

        if (req.url === '/api/generate-names' && req.method === 'POST') {
          try {
            const body = await readBody();
            const results = await generatePureVietnameseNamesWithGemini(body);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, data: results }));
          } catch (error: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi khi gọi mô hình Gemini' }));
          }
          return;
        }

        if (req.url === '/api/analyze-name' && req.method === 'POST') {
          try {
            const body = await readBody();
            const result = await analyzeCustomNameWithGemini(body.name, body.surname);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, data: result }));
          } catch (error: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi phân tích' }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

