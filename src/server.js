import  express from 'express';
import path from 'path';
import { fileURLToPath  } from 'url';
import { convertTiffToPng } from './services/convertTiffToPng.js';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Servir arquivos estáticos na pasta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));


// Rota para iniciar a conversão e exibir a imagem
app.get('/', (req, res) => {
    // Verificar se o caminho está sendo resolvido corretamente
    const indexPath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(indexPath);
});

// Iniciar o servidor
(async () => {
        await convertTiffToPng();
        app.listen(port, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
})();