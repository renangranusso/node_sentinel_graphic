import { fromFile } from 'geotiff'; // Dependência necessária para processar o arquivo GeoTIFF
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function convertTiffToPng(){
    // Carregar o arquivo GeoTIFF/raster
    const tiff = await fromFile(path.join(__dirname, '..', '..', 'sentinel_img2.tif'));
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    const data = await image.readRasters();
    const NDVI_MIN = -0.2;  // Exemplo de valor mínimo
    const NDVI_MAX = 1.0;   // Exemplo de valor máximo

    const rgbData = new Uint8ClampedArray(width * height * 3);
    for (let i = 0; i < data[0].length; i++){
        const value = data[0][i];
        const ndviValue = (value + 1) / 2;  // Normaliza NDVI de [-1, 1] para [0, 1]

        let r, g, b;

        if(value >= NDVI_MIN && value <= NDVI_MAX){
            if (ndviValue < 0.2){ //cores para água, solo, etc.
                r = 0;
                g = 0;
                b = 255 * ndviValue * 5;
            }else if (ndviValue < 0.4){ //Vegetação esparsa
                r = 255 * (ndviValue - 0.2) * 5;
                g = 255 * (ndviValue - 0.2) * 5;
                b = 0;
            } else { // Vegetação densa
                r = 0;
                g = 255 * (ndviValue - 0.4) * 2.5;
                b = 0;
            }
        }else {
            rgbData[i * 4 + 0] = 0;  // Branco
            rgbData[i * 4 + 1] = 0;  // Branco
            rgbData[i * 4 + 2] = 0;  // Branco
            rgbData[i * 4 + 3] = 255;  // Opacidade 100% (opaco)
    }
        // Atribuir as cores RGB no array
        rgbData[i * 3] = r;
        rgbData[i * 3 + 1] = g;
        rgbData[i * 3 + 2] = b;
    }

    const pngBuffer = await sharp(Buffer.from(rgbData), { raw: { width, height, channels: 3 } })
        .png()
        .toBuffer();
    
    const pngFilePath = path.join(__dirname, '..', '..', 'public', 'ndvi.png');
    // Salvar a imagem PNG
    fs.writeFileSync(pngFilePath, pngBuffer);
}
