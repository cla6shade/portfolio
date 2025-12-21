import { stat, unlink } from 'fs/promises';

export async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function shouldConvert(sourcePath, targetPath) {
  if (!(await fileExists(targetPath))) {
    return true;
  }

  const sourceStats = await stat(sourcePath);
  const targetStats = await stat(targetPath);

  return sourceStats.mtimeMs > targetStats.mtimeMs;
}

export async function deleteFile(filePath) {
  await unlink(filePath);
  console.log(`Deleted: ${filePath}`);
}