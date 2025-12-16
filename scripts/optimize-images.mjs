import { glob } from 'glob';
import sharp from 'sharp';
import { mkdir, stat } from 'fs/promises';
import { basename, dirname, extname, join } from 'path';

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function shouldConvert(sourcePath, targetPath) {
  if (!(await fileExists(targetPath))) {
    return true;
  }

  const sourceStats = await stat(sourcePath);
  const targetStats = await stat(targetPath);

  return sourceStats.mtimeMs > targetStats.mtimeMs;
}

async function convertToWebp(sourcePath, targetPath) {
  const targetDir = dirname(targetPath);
  await mkdir(targetDir, { recursive: true });

  await sharp(sourcePath).webp({ quality: 85 }).toFile(targetPath);

  console.log(`Converted: ${sourcePath} -> ${targetPath}`);
}

async function main() {
  const projectRoot = process.cwd();
  const pattern = join(projectRoot, 'src/contents/**/*.{png,jpg,webp}');
  console.log(pattern);
  const imagePaths = await glob(pattern, { absolute: true, windowsPathsNoEscape: true });

  if (imagePaths.length === 0) {
    console.log('No images found in src/contents/');
    return;
  }

  console.log(`Found ${imagePaths.length} images\n`);

  let convertedCount = 0;
  let skippedCount = 0;

  for (const sourcePath of imagePaths) {
    const parentDir = basename(dirname(sourcePath));
    const fileName = basename(sourcePath, extname(sourcePath));
    const targetPath = join(projectRoot, 'public/blog', parentDir, `${fileName}.webp`);

    if (!(await shouldConvert(sourcePath, targetPath))) {
      console.log(`Skipped: ${sourcePath}`);
      skippedCount++;
      continue;
    }

    await convertToWebp(sourcePath, targetPath);
    convertedCount++;
  }

  console.log('\nSummary:');
  console.log(`Total images: ${imagePaths.length}`);
  console.log(`Converted: ${convertedCount}`);
  console.log(`Skipped: ${skippedCount}`);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
