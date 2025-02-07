import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function generatePWAIcons() {
  try {
    const svgBuffer = readFileSync(join(projectRoot, 'public', 'favicon.svg'));
    
    const sizes = [64, 192, 512];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .toFormat('png')
        .toFile(join(projectRoot, 'public', `pwa-${size}x${size}.png`));
      
      console.log(`Generated ${size}x${size} icon`);
    }
    
    console.log('PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
    process.exit(1);
  }
}

generatePWAIcons();
