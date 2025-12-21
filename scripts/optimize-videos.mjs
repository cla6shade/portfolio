import { glob } from 'glob';
import { basename, dirname, join } from 'path';
import { spawn } from 'child_process';
import { mkdir } from 'fs/promises';
import ffmpegPath from 'ffmpeg-static';
import { shouldConvert, deleteFile } from './utils.mjs';

async function convertToWebm(sourcePath, targetPath) {
  const targetDir = dirname(targetPath);
  await mkdir(targetDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const args = [
      '-i',
      sourcePath,
      '-c:v',
      'libvpx-vp9',
      '-crf',
      '35',
      '-b:v',
      '0',
      '-vf',
      'scale=1280:-1',
      '-an',
      '-y',
      targetPath,
    ];

    const ffmpeg = spawn(ffmpegPath, args);

    ffmpeg.stderr.on('data', (data) => {
      // ffmpeg outputs to stderr for progress
      process.stderr.write(data);
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log(`Converted: ${sourcePath} -> ${targetPath}`);
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });

    ffmpeg.on('error', (err) => {
      console.error(`Error converting ${sourcePath}:`, err.message);
      reject(err);
    });
  });
}

async function processVideo(sourcePath, projectRoot) {
  const parentDir = basename(dirname(sourcePath));
  const fileName = basename(sourcePath, '.mp4');
  const targetPath = join(projectRoot, 'public/blog', parentDir, `${fileName}.webm`);

  if (!(await shouldConvert(sourcePath, targetPath))) {
    console.log(`Skipped: ${sourcePath}`);
    await deleteFile(sourcePath);
    return 'skipped';
  }

  try {
    await convertToWebm(sourcePath, targetPath);
    await deleteFile(sourcePath);
    return 'converted';
  } catch (error) {
    console.error(`Failed to process ${sourcePath}`);
    return 'error';
  }
}

async function main() {
  const projectRoot = process.cwd();
  const pattern = join(projectRoot, 'src/contents/**/*.mp4');
  console.log(pattern);
  const videoPaths = await glob(pattern, { absolute: true, windowsPathsNoEscape: true });

  if (videoPaths.length === 0) {
    console.log('No videos found in src/contents/');
    return;
  }

  console.log(`Found ${videoPaths.length} videos\n`);

  let convertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const sourcePath of videoPaths) {
    const result = await processVideo(sourcePath, projectRoot);

    if (result === 'skipped') {
      skippedCount++;
    } else if (result === 'converted') {
      convertedCount++;
    } else {
      errorCount++;
    }
  }

  console.log('\nSummary:');
  console.log(`Total videos: ${videoPaths.length}`);
  console.log(`Converted: ${convertedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
