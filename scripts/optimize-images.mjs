import { glob } from 'glob';
import sharp from 'sharp';
import { mkdir, copyFile } from 'fs/promises';
import { basename, dirname, extname, join } from 'path';
import { shouldConvert, deleteFile } from './utils.mjs';

async function convertToWebp(sourcePath, targetPath) {
  const targetDir = dirname(targetPath);
  await mkdir(targetDir, { recursive: true });

  await sharp(sourcePath)
    .webp({ quality: 100, lossless: false, nearLossless: false, smartSubsample: true })
    .toFile(targetPath);

  console.log(`Converted: ${sourcePath} -> ${targetPath}`);
}

async function copyGif(sourcePath, targetPath) {
  const targetDir = dirname(targetPath);
  await mkdir(targetDir, { recursive: true });

  await copyFile(sourcePath, targetPath);

  console.log(`Copied: ${sourcePath} -> ${targetPath}`);
}

async function processImage(sourcePath, projectRoot) {
  const parentDir = basename(dirname(sourcePath));
  const fileName = basename(sourcePath, extname(sourcePath));
  const ext = extname(sourcePath).toLowerCase();

  const isGif = ext === '.gif';
  const targetPath = isGif
    ? join(projectRoot, 'public/blog', parentDir, `${fileName}.gif`)
    : join(projectRoot, 'public/blog', parentDir, `${fileName}.webp`);

  if (!(await shouldConvert(sourcePath, targetPath))) {
    console.log(`Skipped: ${sourcePath}`);
    await deleteFile(sourcePath);
    return 'skipped';
  }

  if (isGif) {
    await copyGif(sourcePath, targetPath);
    await deleteFile(sourcePath);
    return 'copied';
  }

  await convertToWebp(sourcePath, targetPath);
  await deleteFile(sourcePath);
  return 'converted';
}

async function main() {
  const projectRoot = process.cwd();
  const pattern = join(projectRoot, 'src/contents/**/*.{png,jpg,webp,gif}');
  console.log(pattern);
  const imagePaths = await glob(pattern, { absolute: true, windowsPathsNoEscape: true });

  if (imagePaths.length === 0) {
    console.log('No images found in src/contents/');
    return;
  }

  console.log(`Found ${imagePaths.length} images\n`);

  let convertedCount = 0;
  let copiedCount = 0;
  let skippedCount = 0;

  for (const sourcePath of imagePaths) {
    const result = await processImage(sourcePath, projectRoot);

    if (result === 'skipped') {
      skippedCount++;
    } else if (result === 'copied') {
      copiedCount++;
    } else {
      convertedCount++;
    }
  }

  console.log('\nSummary:');
  console.log(`Total images: ${imagePaths.length}`);
  console.log(`Converted: ${convertedCount}`);
  console.log(`Copied (GIF): ${copiedCount}`);
  console.log(`Skipped: ${skippedCount}`);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
