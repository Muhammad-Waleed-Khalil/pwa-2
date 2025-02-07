import { writeFile } from 'fs/promises';
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function generatePWAIcons() {
  try {
    const imagePath = join(projectRoot, 'job-interview.png');
    const sizes = [64, 192, 512];
    
    for (const size of sizes) {
      // Generate regular (any) icons
      await sharp(imagePath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFormat('png')
        .toFile(join(projectRoot, 'public', `pwa-${size}x${size}.png`));
      
      // Generate maskable icons with padding
      await sharp(imagePath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFormat('png')
        .toFile(join(projectRoot, 'public', `pwa-maskable-${size}x${size}.png`));
      
      console.log(`Generated ${size}x${size} regular and maskable icons`);
    }
    
    console.log('PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
    process.exit(1);
  }
}

generatePWAIcons();
